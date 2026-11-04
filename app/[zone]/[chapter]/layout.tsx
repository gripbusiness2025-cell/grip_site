import { notFound } from "next/navigation";
import { lookupChapter } from "@/lib/seo";

interface Props {
  children: React.ReactNode;
  params: Promise<{ zone: string; chapter: string }>;
}

/* Unknown chapters (and their /members, /gallery pages) return a real 404. */
// Pages are built on first visit, then cached and refreshed every 5 minutes
// (instead of being rendered fresh with no-store on every request).
export const revalidate = 300;
export async function generateStaticParams() {
  return [];
}

export default async function ChapterLayout({ children, params }: Props) {
  const { zone, chapter } = await params;
  const { status } = await lookupChapter(zone, chapter);
  if (status === "missing") notFound();
  return children;
}
