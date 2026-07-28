import type { Metadata } from "next";
import StorePage from "../../stores/[slug]/page";

export const metadata: Metadata = {
  title: "Prestige Cinema | Prestige Plaza",
  description: "Discover Prestige Cinema at Prestige Plaza Nairobi, then continue to the cinema website for showtimes and booking.",
};

export default function CinemaPage() {
  return <StorePage params={Promise.resolve({ slug: "prestige-cinema" })} />;
}
