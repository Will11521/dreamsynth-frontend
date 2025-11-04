import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getServiceRoleClient } from "@/lib/supabase";

const Body = z.object({
  email: z.string().email().transform((e) => e.trim().toLowerCase()),
  token: z.string().optional()
});

// naive per-IP limiter (ok for single-node vercel function; replace with KV later)
const WINDOW_MS = 60_000;
const MAX_REQ = 5;
const buckets = new Map<string, { n: number; t: number }>();
function rateLimit(ip: string) {
  const now = Date.now();
  const bucket = buckets.get(ip) ?? { n: 0, t: now };
  if (now - bucket.t > WINDOW_MS) {
    bucket.n = 0;
    bucket.t = now;
  }
  bucket.n += 1;
  buckets.set(ip, bucket);
  return bucket.n <= MAX_REQ;
}

const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL;
function originAllowed(req: Request) {
  const o = req.headers.get("origin") || "";
  return !ORIGIN || o.startsWith(ORIGIN);
}

const ERROR_MESSAGE = "Please try again later.";

function errorResponse(status: number) {
  return NextResponse.json({ ok: false, message: ERROR_MESSAGE }, { status });
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) {
      return ip;
    }
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "0.0.0.0";
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (!originAllowed(request)) {
    return errorResponse(403);
  }

  let parsed:
    | {
        email: string;
        token?: string | undefined;
      }
    | undefined;

  try {
    const body = await request.json();
    const result = Body.safeParse(body);

    if (!result.success) {
      return errorResponse(400);
    }

    parsed = result.data;
  } catch (error) {
    console.error("[waitlist] invalid payload", error);
    return errorResponse(400);
  }

  const { email, token } = parsed;

  if (token && token.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  if (!rateLimit(ip)) {
    return errorResponse(429);
  }

  try {
    const supabase = getServiceRoleClient();

    if (supabase) {
      const nowIso = new Date().toISOString();
      const { error } = await supabase
        .from("waitlist")
        .upsert(
          {
            email,
            source: "web",
            updated_at: nowIso
          },
          { onConflict: "email" }
        );

      if (error) {
        throw error;
      }

      return NextResponse.json({ ok: true, message: "Check your inbox." });
    }

    const formspreeUrl = process.env.FORMSPREE_URL;

    if (!formspreeUrl) {
      return errorResponse(500);
    }

    const formResponse = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!formResponse.ok) {
      return errorResponse(502);
    }

    return NextResponse.json({ ok: true, message: "Check your inbox." });
  } catch (error) {
    console.error("[waitlist] handler error", error);
    return errorResponse(500);
  }
}

export function GET() {
  return NextResponse.json(
    {
      ok: true,
      message: "DreamSynth waitlist is invite-only. POST an email to join."
    },
    { status: 200 }
  );
}
