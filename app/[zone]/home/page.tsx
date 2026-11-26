import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { fetchWebsiteEvents } from "@/lib/websiteEvents";
import { toTitle, withSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ zone: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone } = await params;
  return withSeo(`/${zone}/home`, {
    title: `GRIP ${toTitle(zone)} – Global Referral Interacting Platform`,
    description:
      "GRIP is a global referral-based networking platform fostering ethical collaboration, structured business growth, and meaningful professional connections.",
  });
}

export default async function ZoneHomePage({ params }: Props) {
  const { zone } = await params;
  const events = await fetchWebsiteEvents();
  return <HomePage events={events} menuType="zone" zoneSlug={zone} />;
}
