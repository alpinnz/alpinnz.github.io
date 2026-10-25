import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../globals.css";
import { createSiteMetadata, createStructuredData } from "../site-metadata";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata("en");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={sora.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createStructuredData("en")).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
