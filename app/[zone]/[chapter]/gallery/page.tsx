import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChapterGalleryPage from "@/components/ChapterGalleryPage";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd, toTitle, withSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ zone: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, chapter } = await params;
  return withSeo(`/${zone}/${chapter}/gallery`, {
    title: `Gallery – GRIP ${toTitle(chapter)} Chapter | ${toTitle(zone)}`,
    description: `Photo gallery of the GRIP ${toTitle(chapter)} Chapter in ${toTitle(zone)}.`,
  });
}

export default async function GalleryPage({ params }: Props) {
  const { zone, chapter } = await params;
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: toTitle(zone), path: `/${zone}` },
          { name: `GRIP ${toTitle(chapter)} Chapter`, path: `/${zone}/${chapter}` },
          { name: "Gallery", path: `/${zone}/${chapter}/gallery` },
        ])}
      />
      <ChapterGalleryPage zoneSlug={zone} chapterSlug={chapter} />
      <Footer />
    </>
  );
}
