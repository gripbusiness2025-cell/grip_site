import type { MetadataRoute } from "next";
import { SITE_URL, getChapterList, slugify, visibleZoneChapters, zoneSlugs } from "@/lib/seo";
import { getAllMembers, isMemberId } from "@/lib/members";

// Rebuilt at most once an hour, so new zones, chapters and members appear automatically
export const revalidate = 3600;

const STATIC_PAGES = [
  "/",
  "/about",
  "/founder",
  "/founding-executive-directors",
  "/franchising",
  "/franchise-partners",
  "/upcoming-events",
  "/membership-policies",
  "/enquiry",
  "/faq",
  "/careers",
  "/contact",
  "/head-legal-training",
  "/policies",
  "/privacy",
  "/terms",
];

const ZONE_SUBPAGES = ["", "/home", "/events", "/membership-policies", "/enquiry", "/faq", "/contact"];

// Used only if the API is down when the sitemap is built (same URLs as the old static sitemap)
const FALLBACK = [{ zone: "chennai-west-zone", chapters: ["aram"] }];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    lastModified: now,
    changeFrequency: p === "/" || p === "/upcoming-events" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.7,
  }));

  const list = await getChapterList();
  const zones = list
    ? zoneSlugs(list).map((z) => ({
        zone: z.slug,
        chapters: visibleZoneChapters(list, z.slug).map((c) => slugify(c.chapterName)),
      }))
    : FALLBACK;

  for (const { zone, chapters } of zones) {
    for (const sub of ZONE_SUBPAGES) {
      urls.push({ url: `${SITE_URL}/${zone}${sub}`, lastModified: now, changeFrequency: "weekly", priority: sub === "" ? 0.8 : 0.6 });
    }
    for (const ch of chapters) {
      urls.push({ url: `${SITE_URL}/${zone}/${ch}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
      urls.push({ url: `${SITE_URL}/${zone}/${ch}/members`, lastModified: now, changeFrequency: "weekly", priority: 0.6 });
      urls.push({ url: `${SITE_URL}/${zone}/${ch}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
    }
  }

  const members = (await getAllMembers()) || [];
  const seen = new Set<string>();
  for (const m of members) {
    if (!isMemberId(m._id) || seen.has(m._id)) continue;
    seen.add(m._id);
    urls.push({ url: `${SITE_URL}/member/${m._id}`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
  }

  return urls;
}
