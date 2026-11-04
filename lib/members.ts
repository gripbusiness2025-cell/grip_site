import { getChapterMembers } from "@/lib/chapterMembers";
import { getChapterList, slugify, visibleZoneChapters, zoneSlugs } from "@/lib/seo";

export type MemberEntry = {
  _id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  photo: string | null;
  profileLink: string;
  chapterName: string;
  chapterPath: string;
  zoneName: string;
};

/** Real member ids are Mongo ObjectIds; fallback rows use ids like "head-3". */
export const isMemberId = (id: string) => /^[a-f0-9]{24}$/i.test(id);

/**
 * Every member of every chapter shown on the site (server side, cached).
 * Returns null when the API could not be reached.
 */
export async function getAllMembers(): Promise<MemberEntry[] | null> {
  const list = await getChapterList();
  if (!list) return null;
  const out: MemberEntry[] = [];
  for (const zone of zoneSlugs(list)) {
    for (const ch of visibleZoneChapters(list, zone.slug)) {
      const chapterSlug = slugify(ch.chapterName);
      const data = await getChapterMembers(chapterSlug, zone.slug);
      for (const m of data.members) {
        out.push({
          _id: String(m._id),
          name: m.name || "",
          role: m.role || "",
          company: m.company || "",
          email: m.email || "",
          phone: m.phone || "",
          photo: m.photo || null,
          profileLink: m.profileLink || "",
          chapterName: data.chapterInfo?.name || ch.chapterName,
          chapterPath: `/${zone.slug}/${chapterSlug}`,
          zoneName: zone.name,
        });
      }
    }
  }
  return out;
}
