"use client";

import { DefaultSeo } from "next-seo";
import { Analytics } from "@vercel/analytics/react";
import SEO from "@/next-seo.config";

export function SeoAnalytics() {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Analytics />
    </>
  );
}
