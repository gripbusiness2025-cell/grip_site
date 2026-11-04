import type { Metadata } from "next";

/* ─── SEO helpers shared by pages, layouts, sitemap and robots ─────────── */

export const SITE_URL = "https://gripforum.com";
export const SITE_NAME = "GRIP – Global Referral Interacting Platform";
export const LOGO_URL = `${SITE_URL}/assets/images/logo/logo-grip.jpg`;

const API = "https://api.gripforum.com/api";

/** How long (seconds) server-side API data is cached before it is refetched. */
export const REVALIDATE_SECONDS = 300;

export function slugify(s: string) {
  return (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Wraps a page's metadata with a canonical URL and matching Open Graph tags,
 * so each page stops inheriting the home page's og:url.
 */
export function withSeo(path: string, meta: Metadata): Metadata {
  const title = typeof meta.title === "string" ? meta.title : undefined;
  const description = meta.description ?? undefined;
  return {
    ...meta,
    alternates: { canonical: path, ...(meta.alternates || {}) },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: LOGO_URL }],
      ...(meta.openGraph || {}),
    },
  };
}

/* ─── API lookups (server side, cached) ─────────────────────────────────── */

async function getJson(url: string, timeoutMs = 6000): Promise<any | null> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal, next: { revalidate: REVALIDATE_SECONDS } });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export type ApiChapter = {
  _id: string;
  chapterName: string;
  isActive?: number;
  isDelete?: number;
  zoneId?: { _id: string; zoneName: string };
  [key: string]: any;
};

/** All chapters from the API, or null when the API could not be reached. */
export async function getChapterList(): Promise<ApiChapter[] | null> {
  const json = await getJson(`${API}/mobile/chapters/list?limit=200`);
  if (!json || !Array.isArray(json.data)) return null;
  return json.data;
}

/** Same chapter filter the zone page (ZoneDetail) uses to decide what it lists. */
const CHENNAI_WEST_ALLOWED = ["ARAM", "VIRUTCHAM", "NEXOR", "EDUCATION"];
export function visibleZoneChapters(list: ApiChapter[], zoneSlug: string): ApiChapter[] {
  return list.filter((c) => {
    const isZoneMatch = slugify(c.zoneId?.zoneName || "") === zoneSlug;
    const isChapterActive = c.isActive === 1 && c.isDelete !== 1;
    if (zoneSlug === "chennai-west-zone") {
      return isZoneMatch && isChapterActive && CHENNAI_WEST_ALLOWED.includes(c.chapterName?.toUpperCase());
    }
    return isZoneMatch && isChapterActive;
  });
}

/** Unique zone slugs that have at least one chapter. */
export function zoneSlugs(list: ApiChapter[]): { slug: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const c of list) {
    const name = c.zoneId?.zoneName || "";
    const slug = slugify(name);
    if (slug && !seen.has(slug)) seen.set(slug, name);
  }
  return [...seen.entries()].map(([slug, name]) => ({ slug, name }));
}

/**
 * "found" / "missing" when the API answered, "unknown" when it could not be
 * reached (in that case pages render normally instead of returning a 404).
 */
export type LookupStatus = "found" | "missing" | "unknown";

export async function lookupZone(zoneSlug: string): Promise<{ status: LookupStatus; name: string; list: ApiChapter[] | null }> {
  const list = await getChapterList();
  if (!list) return { status: "unknown", name: toTitle(zoneSlug), list: null };
  const z = zoneSlugs(list).find((x) => x.slug === zoneSlug);
  return { status: z ? "found" : "missing", name: z ? toTitle(slugify(z.name)) : toTitle(zoneSlug), list };
}

export async function lookupChapter(zoneSlug: string, chapterSlug: string): Promise<{ status: LookupStatus; chapter: ApiChapter | null }> {
  const list = await getChapterList();
  if (!list) return { status: "unknown", chapter: null };
  const chapter =
    list.find((c) => slugify(c.chapterName) === chapterSlug && slugify(c.zoneId?.zoneName || "") === zoneSlug) || null;
  return { status: chapter ? "found" : "missing", chapter };
}

/** Zone events from the API (purpose "event"), or null if unreachable. */
export async function getZoneEvents(zoneSlug: string): Promise<any[] | null> {
  const json = await getJson(`${API}/public/chapters/events?zone=${encodeURIComponent(zoneSlug)}`);
  if (!json || !json.success || !Array.isArray(json.data)) return null;
  return json.data;
}

/** True when an event's end (or start) time is still in the future. */
export function isUpcoming(e: { startDate?: string; endDate?: string }, now = Date.now()) {
  const when = e.endDate || e.startDate;
  if (!when) return true;
  const t = new Date(when).getTime();
  return Number.isNaN(t) ? true : t >= now;
}

/* ─── JSON-LD builders ──────────────────────────────────────────────────── */

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "GRIP",
    alternateName: "Global Referral Interacting Platform",
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: [
      "https://www.facebook.com/gripbusinessforum",
      "https://www.instagram.com/gripbusinessforum/",
      "https://www.linkedin.com/in/grip-business-forum-b83578363/",
      "https://www.youtube.com/@GripBusinessForum",
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
