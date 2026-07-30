import type { Metadata } from "next";
import Footer from "@/components/Footer";
import MembersTable from "@/components/MembersTable";

interface Props {
  params: Promise<{ zone: string; chapter: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, chapter } = await params;
  const toTitle = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `GRIP ${toTitle(chapter)} Chapter – Members | ${toTitle(zone)}`,
    description: `View all associates of the GRIP ${toTitle(chapter)} Chapter in ${toTitle(zone)}.`,
  };
}

export default async function ChapterMembersPage({ params }: Props) {
  const { zone, chapter } = await params;
  return (
    <>
      <MembersTable zoneSlug={zone} chapterSlug={chapter} />
      <Footer />
    </>
  );
}
