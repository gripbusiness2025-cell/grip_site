import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ZoneDetail from "@/app/[zone]/ZoneDetail";

interface Props {
  params: Promise<{ zone: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone } = await params;
  const toTitle = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `GRIP ${toTitle(zone)} Chapters | India's 1st Digital Business Networking Forum`,
    description: `Explore professional networking chapters under ${toTitle(zone)} — weekly networking meetings, leadership, and associates.`,
  };
}

export default async function ZonePage({ params }: Props) {
  const { zone } = await params;
  return (
    <>
      <ZoneDetail zoneSlug={zone} />
      <Footer />
    </>
  );
}
