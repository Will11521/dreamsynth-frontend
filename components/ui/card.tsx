"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-ink/10 bg-white/70 p-8 shadow-[0_20px_45px_-30px_rgba(25,25,25,0.45)] backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("mb-3 font-serif text-2xl tracking-wide text-ink", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-6 text-muted", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export { Card, CardTitle, CardDescription };
