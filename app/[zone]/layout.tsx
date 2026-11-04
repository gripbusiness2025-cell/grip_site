import { notFound } from "next/navigation";
import { lookupZone } from "@/lib/seo";

interface Props {
  children: React.ReactNode;
  params: Promise<{ zone: string }>;
}

/*
 * Every /[zone]/* URL passes through here. Unknown zones now return a real
 * 404 instead of a 200 "fake zone" page. If the API is unreachable the page
 * renders as before (no false 404s).
 */
// Pages are built on first visit, then cached and refreshed every 5 minutes
// (instead of being rendered fresh with no-store on every request).
export const revalidate = 300;
export async function generateStaticParams() {
  return [];
}

export default async function ZoneLayout({ children, params }: Props) {
  const { zone } = await params;
  const { status } = await lookupZone(zone);
  if (status === "missing") notFound();
  return children;
}
