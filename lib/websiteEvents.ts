const PROD_API = "https://api.gripforum.com/api";
const PROD_IMG = "https://api.gripforum.com/api/public";

export type WebsiteEventCard = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

const FALLBACK_EVENTS: WebsiteEventCard[] = [
  {
    _id: "fallback-nexor",
    title: "GRIP NEXOR - Launch",
    description:
      "An exclusive chapter for young entrepreneurs aged between 18 to 22 years",
    imageUrl: "/assets/images/grip/blog2.png",
  },
  {
    _id: "fallback-virutcham",
    title: "GRIP Virutcham - Launch",
    description:
      "A platform to nurture business growth through strong referral roots.",
    imageUrl: "/assets/images/grip/launch.jpg",
  },
];

function buildImageUrl(
  image: { docPath?: string; docName?: string } | null | undefined,
  imgBase: string
) {
  if (!image?.docPath || !image?.docName) return null;
  return `${imgBase}/${image.docPath}/${image.docName}`;
}

export async function fetchWebsiteEvents(): Promise<WebsiteEventCard[]> {
  try {
    const res = await fetch(`${PROD_API}/public/website/events`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      const list = Array.isArray(json?.data) ? json.data : [];
      if (list.length > 0) {
        return list.map((e: any) => ({
          _id: String(e._id),
          title: e.title || "",
          description: e.description || "",
          imageUrl: buildImageUrl(e.image, PROD_IMG),
        }));
      }
    }
  } catch {
    /* fall through to fallback */
  }
  return FALLBACK_EVENTS;
}
