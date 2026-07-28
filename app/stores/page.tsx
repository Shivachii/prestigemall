import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "../components/icons";
import StoresDirectory from "./StoresDirectory";

export const metadata = {
  title: "Store Directory | Prestige Plaza",
  description: "Browse shopping, dining, entertainment and services at Prestige Plaza Nairobi.",
};

const categories = ["All", "Shopping", "Dining", "Entertainment", "Services"] as const;
type StoresPageProps = { searchParams: Promise<{ category?: string }> };

export default async function StoresPage({ searchParams }: StoresPageProps) {
  const requestedCategory = (await searchParams).category;
  const initialCategory = categories.find((category) => category === requestedCategory) ?? "All";

  return (
    <main className="stores-page">
      <header className="subpage-nav shell">
        <Link href="/" className="subpage-logo">
          <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
        </Link>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
      </header>

      <section className="stores-hero shell">
        <p className="eyebrow">Mall directory</p>
        <h1>Find your<br />favourite place.</h1>
        <p>Explore every store, restaurant, service and experience at Prestige Plaza.</p>
      </section>

      <StoresDirectory key={initialCategory} initialCategory={initialCategory} />
    </main>
  );
}
