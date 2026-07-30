import { NextRequest, NextResponse } from "next/server";

const LOCAL  = "http://localhost:4002/api";
const PROD   = "https://api.gripforum.com/api";
const IMAGE_URL = "https://api.gripforum.com/api/public";
const LOCAL_IMAGE_URL = "http://localhost:4002/api/public";

async function tryFetch(paths: string[]): Promise<Response | null> {
  for (const url of paths) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 4000);
      const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
      clearTimeout(t);
      if (res.ok) return res;
    } catch { /* try next */ }
  }
  return null;
}

function slugify(s: string) {
  return (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chapterSlug = searchParams.get("chapter") || "";
  const zoneSlug    = searchParams.get("zone")    || "";

  if (!chapterSlug) {
    return NextResponse.json({ members: [], total: 0, chapterInfo: null }, { status: 400 });
  }

  try {
    // ── 1. Find chapter by name slug via the PUBLIC mobile endpoint ────────
    const listRes = await tryFetch([
      `${LOCAL}/mobile/chapters/list?search=${encodeURIComponent(chapterSlug)}&limit=50`,
      `${PROD}/mobile/chapters/list?search=${encodeURIComponent(chapterSlug)}&limit=50`,
    ]);
    if (!listRes) {
      return NextResponse.json({ members: [], total: 0, chapterInfo: null });
    }

    const listJson = await listRes.json();
    const chapters: any[] = listJson.data || [];

    // Match by slugified name (+ zone if provided)
    let matched = chapters.find(
      (c: any) =>
        slugify(c.chapterName) === chapterSlug &&
        slugify(c.zoneId?.zoneName || "") === zoneSlug
    ) || chapters.find((c: any) => slugify(c.chapterName) === chapterSlug);

    if (!matched) {
      return NextResponse.json({ members: [], total: 0, chapterInfo: null });
    }

    const chapterId = matched._id;

    // ── 2. Fetch head table members (with roles) + all members in parallel ─
    const [headRes, chapterRes] = await Promise.all([
      tryFetch([
        `${LOCAL}/mobile/chapters/headTableMembers/${chapterId}`,
        `${PROD}/mobile/chapters/headTableMembers/${chapterId}`,
      ]),
      tryFetch([
        `${LOCAL}/admin/chapters/${chapterId}`,
        `${PROD}/admin/chapters/${chapterId}`,
      ]),
    ]);

    const headJson    = headRes    ? await headRes.json()    : { data: [] };
    const chapterJson = chapterRes ? await chapterRes.json() : { data: null };

    const chapterDetail = chapterJson.data || {};

    // ── 3. Also try new public endpoint if available ───────────────────────
    let headTableRoles: any[] = [];
    let associateList: any[] = [];

    let bgImage: { docPath: string; docName: string } | null = null;
    let memberLinks: { memberId: string; profileLink: string }[] = [];
    let usedLocal = false;

    try {
      const localPubUrl = `${LOCAL}/public/chapters/by-slug?chapter=${encodeURIComponent(chapterSlug)}&zone=${encodeURIComponent(zoneSlug)}`;
      const prodPubUrl  = `${PROD}/public/chapters/by-slug?chapter=${encodeURIComponent(chapterSlug)}&zone=${encodeURIComponent(zoneSlug)}`;
      const pubRes = await tryFetch([localPubUrl, prodPubUrl]);
      if (pubRes) {
        usedLocal = pubRes.url?.startsWith(LOCAL) ?? false;
        const pubJson = await pubRes.json();
        if (pubJson.success) {
          headTableRoles = pubJson.headTable  || [];
          associateList  = pubJson.associates || [];
          bgImage        = pubJson.chapterInfo?.bgImage || null;
          memberLinks    = pubJson.chapterInfo?.memberLinks || [];
        }
      }
    } catch {
      // public endpoint not deployed yet — fall through to legacy data
    }

    // ── 4. Normalise members ───────────────────────────────────────────────
    const photoUrl = (img: any) =>
      img?.docPath && img?.docName
        ? `${IMAGE_URL}/${img.docPath}/${img.docName}`
        : null;

    let members: any[] = [];

    if (headTableRoles.length || associateList.length) {
      // New public endpoint available — use structured data
      const norm = (arr: any[], defaultRole: string) =>
        arr.map((m: any) => ({
          _id: m.id,
          name: m.name || "—",
          role: m.role || defaultRole,
          company: m.company || "",
          email: m.email || "",
          phone: m.phone || "",
          photo: photoUrl(m.profileImage),
        }));
      members = [...norm(headTableRoles, "Head Team"), ...norm(associateList, "Associate")];
    } else {
      // Legacy fallback: headTableUsers (CID/Mentors) + all chapter members
      const headUsers: any[] = headJson.data || [];
      const allMembers: any[] = chapterDetail.members || [];

      const headIds   = new Set(headUsers.map((u: any) => String(u.id || u._id)).filter(id => id !== "undefined"));
      const headNames = new Set(headUsers.map((u: any) => (u.name || "").toLowerCase().trim()));

      const headMapped = headUsers.map((u: any, i: number) => ({
        _id: String(u.id || u._id || `head-${i}`),
        name: u.name || "—",
        role: u.roleName || u.position || "Head Team",
        company: u.companyName || "",
        email: u.email || "",
        phone: u.mobileNumber || "",
        photo: photoUrl(u.profileImage),
      }));

      const restMapped = allMembers
        .filter((m: any) => {
          const id   = String(m.id || m._id);
          const name = (m.name || "").toLowerCase().trim();
          return !headIds.has(id) && !headNames.has(name);
        })
        .map((m: any, i: number) => ({
          _id: String(m.id || m._id || `member-${i}`),
          name: m.name || "—",
          role: "Associate",
          company: "",
          email: m.email || "",
          phone: m.mobileNumber || "",
          photo: null,
        }));

      members = [...headMapped, ...restMapped];
    }

    // ── 5. Chapter info ────────────────────────────────────────────────────
    const baseImageUrl = usedLocal ? LOCAL_IMAGE_URL : IMAGE_URL;
    const bgImageUrl = bgImage?.docPath && bgImage?.docName
      ? `${baseImageUrl}/${bgImage.docPath}/${bgImage.docName}`
      : null;

    const chapterInfo = {
      name:            matched.chapterName,
      weekday:         matched.weekday || chapterDetail.weekday || "",
      zone:            matched.zoneId?.zoneName || "",
      stateName:       matched.stateName || "",
      venue:           matched.venue || matched.stateName || "",
      meetingTime:     matched.meetingTime || "7:00 AM",
      totalAssociates: chapterDetail.memberCount ?? members.length,
      bgImageUrl,
      memberLinks,
    };

    return NextResponse.json({ members, total: chapterInfo.totalAssociates, chapterInfo });

  } catch (err) {
    console.error("chapter-members error:", err);
    return NextResponse.json({ members: [], total: 0, chapterInfo: null });
  }
}
