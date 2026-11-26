import type { Metadata } from "next";
import { withSeo } from "@/lib/seo";
import HomePage from "@/components/HomePage";
import { fetchWebsiteEvents } from "@/lib/websiteEvents";

export const metadata: Metadata = withSeo("/", {
  title: "GRIP – Global Referral Interacting Platform for Professional Networking",
  description:
    "GRIP is a global referral-based networking platform fostering ethical collaboration, structured business growth, and meaningful professional connections.",
});

export default async function Home() {
  const events = await fetchWebsiteEvents();
  return <HomePage events={events} />;
}
