import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChapterGalleryPage from "@/components/ChapterGalleryPage";

interface Props {
  params: Promise<{ zone: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, chapter } = await params;
  const toTitle = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `Gallery – GRIP ${toTitle(chapter)} Chapter | ${toTitle(zone)}`,
    description: `Photo gallery of the GRIP ${toTitle(chapter)} Chapter in ${toTitle(zone)}.`,
  };
}

export default async function GalleryPage({ params }: Props) {
  const { zone, chapter } = await params;
  return (
    <>
      <ChapterGalleryPage zoneSlug={zone} chapterSlug={chapter} />
      <Footer />
    </>
  );
}
