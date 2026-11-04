import { zoneSubpageMetadata } from "@/lib/zoneMeta";

interface Props {
  children: React.ReactNode;
  params: Promise<{ zone: string }>;
}

// Title, description and canonical for this client-rendered page
export function generateMetadata({ params }: Props) {
  return zoneSubpageMetadata(params, "home");
}

export default function Layout({ children }: Props) {
  return children;
}
