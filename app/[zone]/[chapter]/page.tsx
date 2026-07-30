import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChapterDetail from "@/components/ChapterDetail";

interface Props {
  params: Promise<{ zone: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, chapter } = await params;
  const toTitle = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `GRIP ${toTitle(chapter)} Chapter – ${toTitle(zone)} | India's 1st Digital Business Networking Forum`,
    description: `Explore the GRIP ${toTitle(chapter)} Chapter in ${toTitle(zone)} — weekly networking meetings, chapter leadership, and associates.`,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { zone, chapter } = await params;
  return (
    <>
      <ChapterDetail zoneSlug={zone} chapterSlug={chapter} />
      <Footer />
    </>
  );
}
