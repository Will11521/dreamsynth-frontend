import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { SectionHeading } from "@/components/section-heading";
import { WaitlistStack } from "@/components/waitlist-stack";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const values = [
  {
    title: "AI Dream Interpretation",
    description:
      "Upload dream fragments and receive grounded, emotionally aware interpretations powered by your sleep patterns."
  },
  {
    title: "Intention-Linked Soundscapes",
    description:
      "Prime your subconscious with adaptive audio rituals that reinforce the intention you set before drifting off."
  },
  {
    title: "Subconscious Pattern Tracking",
    description:
      "Map trends across nights with visuals that surface repeating symbols, moods, and triggers you might miss."
  }
];

const steps = [
  {
    title: "Set Intention",
    description:
      "State what you want to process or discover. DreamSynth tunes your guidance and cues around it."
  },
  {
    title: "Sleep Cues",
    description:
      "Slip into rest with gentle, adaptive soundscapes calibrated to your intention and evening energy."
  },
  {
    title: "Wake + Decode",
    description:
      "Record fragments and let AI decode emotional signals, highlighting what your subconscious surfaced."
  }
];

const roadmap = [
  { label: "Neural Sync", tag: "Later" },
  { label: "Sleep-Triggered Activation" },
  { label: "AI Dream Visualizer" }
];

const dreampoolPreviews = [
  {
    title: "Astral Elevator, NYC",
    blurb:
      "Rider names each floor for a memory they avoided. Morning notes reveal recurring grief signals tied to closure."
  },
  {
    title: "Rain-Glitch Forest",
    blurb:
      "Dreamer follows warped birdsong that shifts with their breath. Intention to ease burnout surfaces play cues."
  },
  {
    title: "Echoing Concert Hall",
    blurb:
      "Empty seats reflect back whispered goals from past shows. AI flagged confidence patterns to revisit next night."
  }
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Section id="hero" aria-labelledby="hero-heading" className="pt-16 sm:pt-24">
          <Container className="flex flex-col items-start gap-10">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">
                DreamSynth
              </p>
              <h1
                id="hero-heading"
                className="font-serif text-4xl tracking-tight text-ink sm:text-5xl lg:text-6xl"
              >
                DreamSynth — the emotional OS for sleep.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Set your intention before sleep. Wake up with AI-decoded
                insights. Bring the hidden layers of your night into daylight
                decisions.
              </p>
            </div>
            <div id="waitlist" className="w-full max-w-2xl">
              <WaitlistStack />
            </div>
          </Container>
        </Section>

        <Section id="about">
          <Container className="space-y-12">
            <SectionHeading
              eyebrow="value"
              title="Designed for intentional dreamers"
              description="DreamSynth keeps the philosophy of the original experience while distilling it into a single, potent ritual."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardTitle>{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section>
          <Container className="space-y-12">
            <SectionHeading
              eyebrow="how it works"
              title="Nightly flow in three beats"
              description="Set your intention, let DreamSynth guide you through the night, and wake with meaning."
            />
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-background">
                    {index + 1}
                  </div>
                  <h3 className="font-serif text-2xl text-ink">{step.title}</h3>
                  <p className="text-sm leading-6 text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="roadmap">
          <Container className="space-y-8">
            <SectionHeading
              eyebrow="roadmap"
              title="On the horizon"
              description="We’re sequencing features that keep intention at the center and expand the Dreampool."
            />
            <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white/60">
              <div className="flex flex-col divide-y divide-ink/10 sm:flex-row sm:divide-x sm:divide-y-0">
                {roadmap.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-1 flex-col items-start gap-2 px-6 py-6 sm:py-8"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
                      {item.tag ? `${item.tag} •` : "Next"}
                    </span>
                    <p className="font-serif text-xl text-ink">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section id="dreampool">
          <Container className="space-y-12">
            <SectionHeading
              eyebrow="dreampool"
              title="Signals from the Dreampool"
              description="Anonymized previews from early dreamers. Each vignette verbalizes the emotional threads we surface."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {dreampoolPreviews.map((dream) => (
                <Card key={dream.title} className="h-full bg-white">
                  <CardTitle className="text-xl">{dream.title}</CardTitle>
                  <CardDescription>{dream.blurb}</CardDescription>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        <Section id="contact">
          <Container className="space-y-8">
            <SectionHeading
              eyebrow="stay in the loop"
              title="Rejoin the waitlist any time"
              description="Need to update your email or send a note? Reach out directly — we read every message."
            />
            <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                Email{" "}
                <Link
                  href="mailto:williamjeetsingh2004@gmail.com"
                  className="text-ink underline underline-offset-4"
                >
                  williamjeetsingh2004@gmail.com
                </Link>{" "}
                and find us on{" "}
                <Link
                  href="https://www.linkedin.com/in/williamjeetsingh2004"
                  className="text-ink underline underline-offset-4"
                >
                  LinkedIn
                </Link>
                .
              </p>
              <Link
                href="#waitlist"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-ink"
              >
                Join waitlist →
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <footer className="border-t border-ink/10 py-8">
        <Container className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DreamSynth. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </div>
        </Container>
      </footer>
    </>
  );
}
