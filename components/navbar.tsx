import Link from "next/link";
import { Container } from "./container";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#roadmap", label: "Roadmap" },
  { href: "#dreampool", label: "Dreampool" },
  { href: "#contact", label: "Contact" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-background/80 backdrop-blur-md">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            DreamSynth
          </Link>
          <nav aria-label="Primary">
            <ul className="hidden items-center gap-6 text-sm text-muted sm:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink/40"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href="#waitlist">Join waitlist</Link>
        </Button>
      </Container>
    </header>
  );
}
