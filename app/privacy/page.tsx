import type { Metadata } from "next";
import { Container } from "@/components/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy"
};

export default function PrivacyPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="space-y-6">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="text-sm leading-6 text-muted sm:text-base">
          DreamSynth is still taking shape. While we finalize the full policy,
          know that:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-sm leading-6 text-muted sm:text-base">
          <li>We only collect your email to update you about the waitlist.</li>
          <li>
            You can request removal at any time by emailing{" "}
            <Link
              href="mailto:williamjeetsingh2004@gmail.com"
              className="text-ink underline underline-offset-4"
            >
              williamjeetsingh2004@gmail.com
            </Link>
            .
          </li>
          <li>We do not sell or share your data with third parties.</li>
        </ul>
        <p className="text-sm text-muted">
          Updated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
        </p>
      </Container>
    </main>
  );
}
