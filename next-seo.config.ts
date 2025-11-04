import type { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  titleTemplate: "%s | DreamSynth",
  defaultTitle: "DreamSynth — the emotional OS for sleep.",
  description:
    "Set your intention before sleep. Wake up with AI-decoded insights. Even if you don’t remember your dreams, we help you rediscover them.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dreamsynth.app",
    siteName: "DreamSynth",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "DreamSynth — the emotional OS for sleep."
      }
    ]
  },
  twitter: {
    handle: "@DreamSynth",
    site: "@DreamSynth",
    cardType: "summary_large_image"
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico"
    }
  ],
  additionalMetaTags: [
    {
      name: "theme-color",
      content: "#F2EFE9"
    }
  ]
};

export default config;
