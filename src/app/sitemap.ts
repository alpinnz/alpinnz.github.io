import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/` }];
}
