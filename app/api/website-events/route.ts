import { NextResponse } from "next/server";
import { fetchWebsiteEvents } from "@/lib/websiteEvents";

export async function GET() {
  const events = await fetchWebsiteEvents();
  return NextResponse.json({ success: true, data: events });
}
