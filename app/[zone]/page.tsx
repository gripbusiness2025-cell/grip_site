import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ZoneDetail from "@/app/[zone]/ZoneDetail";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, lookupZone, toTitle, visibleZoneChapters, withSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ zone: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone } = await params;
  return withSeo(`/${zone}`, {
    title: `GRIP ${toTitle(zone)} Chapters | India's 1st Digital Business Networking Forum`,
    description: `Explore professional networking chapters under ${toTitle(zone)} — weekly networking meetings, leadership, and associates.`,
  });
}

export default async function ZonePage({ params }: Props) {
  const { zone } = await params;
  // Server-side chapter list so the chapters are in the HTML search engines read
  const { list } = await lookupZone(zone);
  const initialChapters = list ? visibleZoneChapters(list, zone) : undefined;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: toTitle(zone), path: `/${zone}` }])} />
      <ZoneDetail zoneSlug={zone} initialChapters={initialChapters as any} />
      <Footer />
    </>
  );
}
