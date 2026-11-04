import JsonLd from "@/components/JsonLd";
import { zoneSubpageMetadata } from "@/lib/zoneMeta";
import { SITE_URL, getZoneEvents, isUpcoming } from "@/lib/seo";

const IMAGE_URL = "https://api.gripforum.com/api/public";

interface Props {
  children: React.ReactNode;
  params: Promise<{ zone: string }>;
}

// Title, description and canonical for this client-rendered page
export function generateMetadata({ params }: Props) {
  return zoneSubpageMetadata(params, "events");
}

/* Adds schema.org Event data for upcoming zone events (past events are left out). */
export default async function Layout({ children, params }: Props) {
  const { zone } = await params;
  const events = ((await getZoneEvents(zone)) || []).filter((e) => isUpcoming(e) && e.startDate);
  const ld = events.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.topic,
    startDate: e.startDate,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(e.address ? { location: { "@type": "Place", name: e.address, address: e.address } } : {}),
    ...(e.image?.docPath && e.image?.docName ? { image: `${IMAGE_URL}/${e.image.docPath}/${e.image.docName}` } : {}),
    organizer: { "@type": "Organization", name: "GRIP", url: SITE_URL },
    url: `${SITE_URL}/${zone}/events`,
    ...(e.paymentRequired === false || e.amount === 0
      ? { isAccessibleForFree: true }
      : {}),
  }));
  return (
    <>
      {ld.length > 0 && <JsonLd data={ld} />}
      {children}
    </>
  );
}
