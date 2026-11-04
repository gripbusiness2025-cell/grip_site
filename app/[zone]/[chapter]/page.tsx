import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ChapterDetail from "@/components/ChapterDetail";
import JsonLd from "@/components/JsonLd";
import { getChapterMembers } from "@/lib/chapterMembers";
import { SITE_URL, breadcrumbLd, toTitle, withSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ zone: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, chapter } = await params;
  return withSeo(`/${zone}/${chapter}`, {
    title: `GRIP ${toTitle(chapter)} Chapter – ${toTitle(zone)} | India's 1st Digital Business Networking Forum`,
    description: `Explore the GRIP ${toTitle(chapter)} Chapter in ${toTitle(zone)} — weekly networking meetings, chapter leadership, and associates.`,
  });
}

export default async function ChapterPage({ params }: Props) {
  const { zone, chapter } = await params;
  // Server-side member list so associates are in the HTML search engines read
  const data = await getChapterMembers(chapter, zone);
  const initialData =
    data.found && data.members.length ? { members: data.members, chapterInfo: data.chapterInfo } : undefined;
  const path = `/${zone}/${chapter}`;
  const chapterName = `GRIP ${toTitle(chapter)} Chapter`;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: toTitle(zone), path: `/${zone}` },
            { name: chapterName, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: chapterName,
            url: `${SITE_URL}${path}`,
            parentOrganization: { "@id": `${SITE_URL}/#organization` },
            areaServed: toTitle(zone),
          },
        ]}
      />
      <ChapterDetail zoneSlug={zone} chapterSlug={chapter} initialData={initialData} />
      <Footer />
    </>
  );
}
