import type { Metadata } from "next";
import { Container } from "@/components/container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use"
};

export default function TermsPage() {
  return (
    <main className="py-16 sm:py-24">
      <Container className="space-y-6">
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">Terms of Use</h1>
        <p className="text-sm leading-6 text-muted sm:text-base">
          DreamSynth is in pre-release. By joining the waitlist or using preview
          experiences, you agree to:
        </p>
        <ul className="list-disc space-y-3 pl-6 text-sm leading-6 text-muted sm:text-base">
          <li>Receive occasional emails about launch updates and invitations.</li>
          <li>Use early feature previews as-is and share feedback respectfully.</li>
          <li>Keep private any materials designated as confidential or early access.</li>
        </ul>
        <p className="text-sm leading-6 text-muted">
          Questions? Reach us at{" "}
          <Link
            href="mailto:williamjeetsingh2004@gmail.com"
            className="text-ink underline underline-offset-4"
          >
            williamjeetsingh2004@gmail.com
          </Link>
          .
        </p>
      </Container>
    </main>
  );
}
