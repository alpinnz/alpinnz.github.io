import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import { createSiteMetadata, createStructuredData } from "../site-metadata";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata("id");

export default function IndonesianLayout({ children }: LayoutProps<"/id">) {
  return (
    <html lang="id">
      <body className={sora.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createStructuredData("id")).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
