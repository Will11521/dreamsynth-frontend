"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TypeformEmbedProps = {
  open: boolean;
  className?: string;
  onReady?: () => void;
};

const SCRIPT_ID = "typeform-embed-script";
const TYPEFORM_SRC = "https://embed.typeform.com/next/embed.js";
const FORM_ID = "01K982W2BGFFRGAH9AAB9NPWMB";

export function TypeformEmbed({ open, className, onReady }: TypeformEmbedProps) {
  const inlineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      inlineContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    if (document.getElementById(SCRIPT_ID)) {
      onReady?.();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = TYPEFORM_SRC;
    script.defer = true;
    script.onload = () => {
      onReady?.();
    };
    document.body.appendChild(script);

    return () => {
      // Keep script in place for navigation reuse; no cleanup required
    };
  }, [open, onReady]);

  if (!open) {
    return null;
  }

  return (
    <>
      <div
        ref={inlineContainerRef}
        className={cn(
          "rounded-3xl border border-white/40 bg-white/80 p-5 shadow-xl backdrop-blur-md",
          className
        )}
      >
        <div
          aria-label="DreamSynth waitlist Typeform"
          data-tf-live={FORM_ID}
          data-tf-opacity="100"
          data-tf-medium="snippet"
          className="w-full rounded-2xl"
          style={{
            minHeight: "640px",
            height: "min(82vh, 760px)"
          }}
        />
      </div>
      <noscript>
        <p className="mt-3 text-sm text-muted">
          Enable JavaScript to load the DreamSynth waitlist Typeform.
        </p>
      </noscript>
    </>
  );
}
