import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export const dynamic = "force-static";

const languageAlternates = {
  en: `${siteUrl}/`,
  id: `${siteUrl}/id/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/`, alternates: { languages: languageAlternates } },
    { url: `${siteUrl}/id/`, alternates: { languages: languageAlternates } },
  ];
}
