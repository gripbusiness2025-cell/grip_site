import { NextRequest, NextResponse } from "next/server";

const PROD      = "https://api.gripforum.com/api";
const IMAGE_URL = "https://api.gripforum.com/api/public";

async function tryFetch(urls: string[]): Promise<Response | null> {
  for (const url of urls) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      const res = await fetch(url, { signal: ctrl.signal, cache: "no-store" });
      clearTimeout(t);
      if (res.ok) return res;
    } catch { /* try next */ }
  }
  return null;
}

function photoUrl(img?: { docPath?: string; docName?: string } | null) {
  if (img?.docPath && img?.docName)
    return `${IMAGE_URL}/${img.docPath}/${img.docName}`;
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const memberId = searchParams.get("id") || "";

  if (!memberId) {
    return NextResponse.json({ member: null }, { status: 400 });
  }

  try {
    // Try mobile member detail endpoint
    const res = await tryFetch([
      `${PROD}/mobile/members/${memberId}`,
      `${PROD}/admin/members/${memberId}`,
      `${PROD}/mobile/members/detail/${memberId}`,
    ]);

    if (!res) {
      return NextResponse.json({ member: null });
    }

    const json = await res.json();
    const raw = json.data || json.member || json;

    const member = {
      _id:          raw._id || raw.id || memberId,
      name:         raw.name || raw.memberName || "—",
      role:         raw.chapterRole || raw.role || raw.position || raw.roleName || "",
      company:      raw.companyName || raw.company || raw.businessName || "",
      email:        raw.email || "",
      phone:        raw.mobileNumber || raw.phone || "",
      photo:        photoUrl(raw.profileImage) || photoUrl(raw.photo),
      companyLogo:  photoUrl(raw.companyLogo) || photoUrl(raw.businessLogo),
      address:      raw.address || raw.companyAddress || "",
      city:         raw.city || "",
      state:        raw.state || raw.stateName || "",
      pincode:      raw.pincode || raw.zipCode || "",
      website:      raw.website || raw.companyWebsite || "",
      category:     raw.category || raw.businessCategory || raw.profession || "",
      subCategory:  raw.subCategory || raw.businessSubCategory || "",
      chapter:      raw.chapterName || raw.chapter || "",
      zone:         raw.zoneName || raw.zone || "",
      profileLink:  raw.profileLink || "",
    };

    return NextResponse.json({ member });
  } catch (err) {
    console.error("member-profile error:", err);
    return NextResponse.json({ member: null });
  }
}
