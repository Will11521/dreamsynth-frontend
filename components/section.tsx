"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  delay?: number;
};

export function Section({
  className,
  children,
  delay = 0.1,
  as: Component = "section",
  ...props
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Component className={cn("py-16 sm:py-20", className)} {...props}>
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </motion.div>
    </Component>
  );
}
