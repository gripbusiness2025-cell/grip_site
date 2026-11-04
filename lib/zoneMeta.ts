import type { Metadata } from "next";
import { toTitle, withSeo } from "@/lib/seo";

/* Titles/descriptions for the zone sub-pages (their page files are client components). */
const PAGES: Record<string, { title: (z: string) => string; description: (z: string) => string }> = {
  home: {
    title: (z) => `GRIP ${z} | India's 1st Digital Business Networking Forum`,
    description: (z) => `GRIP ${z} — referral-based business networking chapters, weekly meetings and associates in ${z}.`,
  },
  events: {
    title: (z) => `Upcoming Events – GRIP ${z}`,
    description: (z) => `Upcoming GRIP chapter meetings and business networking events in ${z}.`,
  },
  contact: {
    title: (z) => `Contact GRIP ${z}`,
    description: (z) => `Get in touch with the GRIP ${z} team for membership, chapter visits and networking enquiries.`,
  },
  enquiry: {
    title: (z) => `Membership Enquiry – GRIP ${z}`,
    description: (z) => `Send a membership enquiry to join a GRIP business networking chapter in ${z}.`,
  },
  faq: {
    title: (z) => `FAQ – GRIP ${z}`,
    description: (z) => `Answers to common questions about GRIP membership, chapters and meetings in ${z}.`,
  },
  "membership-policies": {
    title: (z) => `Membership Policies – GRIP ${z}`,
    description: (z) => `Membership policies and code of conduct for GRIP chapters in ${z}.`,
  },
};

export async function zoneSubpageMetadata(params: Promise<{ zone: string }>, page: keyof typeof PAGES): Promise<Metadata> {
  const { zone } = await params;
  const z = toTitle(zone);
  return withSeo(`/${zone}/${page}`, { title: PAGES[page].title(z), description: PAGES[page].description(z) });
}
