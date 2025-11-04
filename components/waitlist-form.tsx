"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "pending" | "success" | "error";

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;

type WaitlistFormProps = {
  className?: string;
  onSubmitStart?: () => void;
  onSuccess?: () => void;
};

export function WaitlistForm({
  className,
  onSubmitStart,
  onSuccess
}: WaitlistFormProps) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [message, setMessage] = React.useState<string>("");
  const inputId = React.useId();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const token = String(formData.get("token") ?? "");
    const cleanedEmail = email.trim();

    if (!EMAIL_PATTERN.test(cleanedEmail)) {
      setStatus("error");
      setMessage("Add a valid email so we can reach you.");
      return;
    }

    setStatus("pending");
    setMessage("Joining the Dreampool…");
    onSubmitStart?.();

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: cleanedEmail, token })
      });

      const data: { ok: boolean; message?: string } = await response.json();

      if (!response.ok || !data?.ok) {
        throw new Error(data?.message || "Could not save your spot yet.");
      }

      setStatus("success");
      setMessage(data.message || "You’re in. See you in the Dreampool.");
      setEmail("");
      form.reset();
      onSuccess?.();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "We hit a snag. Try again in a moment."
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col gap-3 rounded-2xl border border-white/40 bg-white/70 p-4 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:p-2",
        className
      )}
      aria-labelledby={`${inputId}-label`}
    >
      <input
        type="text"
        name="token"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="w-full sm:flex-1">
        <label
          id={`${inputId}-label`}
          htmlFor={inputId}
          className="sr-only"
        >
          Email address
        </label>
        <Input
          id={inputId}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={`${inputId}-status`}
          aria-invalid={status === "error"}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={status === "pending"}
      >
        {status === "pending" ? "Sending…" : "Join the Waitlist"}
      </Button>
      <p
        id={`${inputId}-status`}
        className={cn(
          "text-sm",
          status === "error"
            ? "text-red-600"
            : status === "success"
            ? "text-ink"
            : "text-muted"
        )}
        aria-live="polite"
        role="status"
      >
        {message || "Even if you don’t remember your dreams, we help you rediscover them."}
      </p>
    </form>
  );
}
