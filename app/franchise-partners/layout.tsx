import { withSeo } from "@/lib/seo";

// Title, description and canonical for this client-rendered page
export const metadata = withSeo("/franchise-partners", {
  title: "Franchise Partners – GRIP India's 1st Digital Business Networking Forum",
  description: "Meet the GRIP franchise partners who lead and grow GRIP business networking chapters across regions.",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
