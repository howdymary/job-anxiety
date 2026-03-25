import type { Metadata } from "next";

import { NewsletterForm } from "@/components/newsletter-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "Subscribe to the weekly brief on what is hiring, what is paying, and what is new."
};

export default function NewsletterPage() {
  return (
    <div className="page-grid-prose grid gap-10">
      <SectionHeading
        eyebrow="Newsletter"
        title="Get the weekly brief"
        description="What is hiring, what is paying, and which new job categories are starting to matter."
      />
      <NewsletterForm />
    </div>
  );
}
