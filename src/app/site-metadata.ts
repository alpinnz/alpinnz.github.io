import type { Metadata } from "next";
import { siteDescription, siteName, siteUrl } from "./site-config";

type Locale = "en" | "id";

const localizedMetadata = {
  en: {
    title: `${siteName} | Full Stack Developer`,
    description: siteDescription,
    openGraphLocale: "en_US",
  },
  id: {
    title: `${siteName} | Full Stack Developer`,
    description:
      "Alfin Noviaji adalah Full Stack Developer dan Senior Frontend Developer di Malang, Indonesia, membangun produk web dan mobile dengan fokus pada arsitektur, performa, dan kolaborasi tim.",
    openGraphLocale: "id_ID",
  },
} satisfies Record<Locale, {
  title: string;
  description: string;
  openGraphLocale: string;
}>;

function localizedPath(locale: Locale): string {
  return locale === "id" ? "/id/" : "/";
}

export function createSiteMetadata(locale: Locale): Metadata {
  const localized = localizedMetadata[locale];
  const canonicalPath = localizedPath(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: localized.title,
    description: localized.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `${siteUrl}/`,
        id: `${siteUrl}/id/`,
        "x-default": `${siteUrl}/`,
      },
    },
    openGraph: {
      type: "website",
      locale: localized.openGraphLocale,
      url: `${siteUrl}${canonicalPath}`,
      siteName,
      title: localized.title,
      description: localized.description,
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.description,
    },
    robots: { index: true, follow: true },
    icons: { icon: "/logo.svg" },
  };
}

export function createStructuredData(locale: Locale) {
  const localized = localizedMetadata[locale];
  const path = localizedPath(locale);
  const personId = `${siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteName,
        url: `${siteUrl}/`,
        jobTitle: "Senior Frontend Developer",
        image: `${siteUrl}/assets/images/profile.webp`,
        sameAs: ["https://github.com/alpinnz", "https://www.linkedin.com/in/alpinnz/"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}${path}#website`,
        url: `${siteUrl}${path}`,
        name: siteName,
        description: localized.description,
        inLanguage: locale,
        creator: { "@id": personId },
      },
    ],
  };
}
