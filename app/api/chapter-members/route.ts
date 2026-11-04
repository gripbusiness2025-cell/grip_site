import { NextRequest, NextResponse } from "next/server";
import { getChapterMembers } from "@/lib/chapterMembers";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const chapterSlug = searchParams.get("chapter") || "";
  const zoneSlug    = searchParams.get("zone")    || "";

  if (!chapterSlug) {
    return NextResponse.json({ members: [], total: 0, chapterInfo: null }, { status: 400 });
  }

  const { members, total, chapterInfo } = await getChapterMembers(chapterSlug, zoneSlug);
  return NextResponse.json({ members, total, chapterInfo });
}
