import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRIP – Global Referral Interacting Platform for Professional Networking",
  description:
    "GRIP is a global referral-based networking platform fostering ethical collaboration, structured business growth, and meaningful professional connections.",
  openGraph: {
    title: "GRIP – Global Referral Interacting Platform for Professional Networking",
    description:
      "Join GRIP, the trusted global platform for professionals to build referral-based connections, collaborate ethically, and grow through structured networking.",
    url: "https://gripforum.com/",
    type: "website",
    images: [{ url: "https://gripforum.com/assets/images/logo/logo.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="no-js" lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/icon" href="/assets/images/logo/grip.png" />
        {/* Preload above-the-fold images */}
        <link rel="preload" as="image" href="https://res.cloudinary.com/dq6gr5zjc/image/upload/v1784264144/about_udd7zm.jpg" />
        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/theme-default.css" rel="stylesheet" />
        <link href="/assets/css/font-awesome-pro.css" rel="stylesheet" />
        <link href="/assets/css/animate.min.css" rel="stylesheet" />
        <link href="/assets/css/venobox.min.css" rel="stylesheet" />
        <link href="/assets/css/style.css?v=1.0.2" rel="stylesheet" />
        <link href="/assets/css/swiper-bundle.min.css" rel="stylesheet" />
        <link href="/assets/css/meanmenu.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        {children}

        {/* JS – jQuery must load first */}
        <Script src="/assets/js/vendor/jquery-3.7.1.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/jquery.counterup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.meanmenu.js" strategy="afterInteractive" />
        <Script src="/assets/js/swiper-bundle.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/SplitText.js" strategy="afterInteractive" />
        <Script src="/assets/js/smooth-scroll.js" strategy="afterInteractive" />
        <Script src="/assets/js/venobox.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/theme.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
