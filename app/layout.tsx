import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({ variable: "--font-body", subsets: ["latin"] });
const fraunces = Fraunces({ variable: "--font-display", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-utility", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Prestige Plaza Nairobi | More Than a Place",
  description: "Discover shopping, dining, cinema, family entertainment and events at Prestige Plaza on Ngong Road, Nairobi.",
  keywords: ["shopping mall Nairobi", "Prestige Plaza", "Ngong Road", "cinema Nairobi", "family entertainment Nairobi"],
  openGraph: {
    title: "Prestige Plaza Nairobi",
    description: "Shopping, dining and entertainment, beautifully brought together.",
    type: "website",
    images: ["/images/scenery/exterior-enhanced-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${workSans.variable} ${fraunces.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
