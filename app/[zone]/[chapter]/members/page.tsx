import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MembersTable from "@/components/MembersTable";
import JsonLd from "@/components/JsonLd";
import { getChapterMembers } from "@/lib/chapterMembers";
import { breadcrumbLd, toTitle, withSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ zone: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, chapter } = await params;
  return withSeo(`/${zone}/${chapter}/members`, {
    title: `GRIP ${toTitle(chapter)} Chapter – Members | ${toTitle(zone)}`,
    description: `View all associates of the GRIP ${toTitle(chapter)} Chapter in ${toTitle(zone)}.`,
  });
}

export default async function ChapterMembersPage({ params }: Props) {
  const { zone, chapter } = await params;
  // Server-side member list so associates are in the HTML search engines read
  const data = await getChapterMembers(chapter, zone);
  const initialData =
    data.found && data.members.length ? { members: data.members, chapterName: data.chapterInfo?.name || "" } : undefined;
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: toTitle(zone), path: `/${zone}` },
          { name: `GRIP ${toTitle(chapter)} Chapter`, path: `/${zone}/${chapter}` },
          { name: "Members", path: `/${zone}/${chapter}/members` },
        ])}
      />
      <MembersTable zoneSlug={zone} chapterSlug={chapter} initialData={initialData} />
      <Footer />
    </>
  );
}
