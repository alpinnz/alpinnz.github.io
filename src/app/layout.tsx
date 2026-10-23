import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { siteDescription, siteName, siteUrl } from "./site-config";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const personId = `${siteUrl}/#person`;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteName,
      url: `${siteUrl}/`,
      jobTitle: "Senior Frontend Developer",
      image: `${siteUrl}/assets/images/profile.png`,
      sameAs: ["https://github.com/alpinnz", "https://www.linkedin.com/in/alpinnz/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      creator: { "@id": personId },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Senior Frontend Developer`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteUrl}/`,
    siteName,
    title: `${siteName} | Senior Frontend Developer`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Senior Frontend Developer`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        alt: "Alfin Noviaji, Senior Frontend Developer in Malang, Indonesia",
      },
    ],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={sora.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
