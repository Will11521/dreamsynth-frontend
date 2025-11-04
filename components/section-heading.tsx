import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-sm leading-6 text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
