"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WaitlistForm } from "@/components/waitlist-form";
import { TypeformEmbed } from "@/components/typeform-embed";
import { Button } from "@/components/ui/button";

export function WaitlistStack() {
  const [showTypeform, setShowTypeform] = React.useState(false);
  const [scriptReady, setScriptReady] = React.useState(false);

  const handleReveal = React.useCallback(() => {
    setShowTypeform(true);
  }, []);

  return (
    <div className="w-full space-y-5">
      <WaitlistForm
        onSubmitStart={handleReveal}
        onSuccess={handleReveal}
      />
      <AnimatePresence>
        {showTypeform ? (
          <motion.div
            key="typeform"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <TypeformEmbed
              open={showTypeform}
              onReady={() => setScriptReady(true)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl border border-ink/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="space-y-3 text-sm text-muted sm:flex sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <p className="font-semibold text-ink">Extended waitlist intake</p>
                <p className="mt-1 max-w-xl text-muted">
                  Share more context for early invites. Tap <span className="font-semibold text-ink">Join the Waitlist</span> to open the DreamSynth Typeform.
                </p>
              </div>
              <Button
                variant="subtle"
                onClick={handleReveal}
                className="w-full sm:w-auto"
              >
                Preview questions
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showTypeform && !scriptReady ? (
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted">
          Loading DreamSynth Typeform…
        </p>
      ) : null}
    </div>
  );
}
