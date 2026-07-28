import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Search } from "../components/icons";
import { tenants } from "../data/tenants";
import { featuredEvent, mallEvents } from "../data/events";

export const metadata: Metadata = {
  title: "Search | Prestige Plaza",
  description: "Search stores, dining, entertainment, services and events at Prestige Plaza.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = ((await searchParams).q ?? "").trim();
  const normalizedQuery = query.toLocaleLowerCase();
  const searchableEvents = [featuredEvent, ...mallEvents];

  const storeResults = normalizedQuery
    ? tenants.filter((tenant) => [
        tenant.name,
        tenant.category,
        tenant.detail,
        tenant.floor,
        tenant.description,
        tenant.tagline,
        ...(tenant.features ?? []),
      ].filter(Boolean).join(" ").toLocaleLowerCase().includes(normalizedQuery))
    : [];

  const eventResults = normalizedQuery
    ? searchableEvents.filter((event) => [
        event.title,
        event.type,
        event.venue,
        event.summary,
        ...(event.details ?? []),
      ].join(" ").toLocaleLowerCase().includes(normalizedQuery))
    : [];

  const resultCount = storeResults.length + eventResults.length;

  return (
    <main className="search-page">
      <header className="subpage-nav shell">
        <Link href="/" className="subpage-logo">
          <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
        </Link>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
      </header>

      <section className="search-page-hero shell">
        <p className="eyebrow">Search Prestige</p>
        <h1>What can we<br />help you find?</h1>
        <form action="/search" className="search-page-form">
          <Search size={22} />
          <input name="q" type="search" defaultValue={query} placeholder="Store, restaurant, event or activity" autoFocus />
          <button type="submit">Search</button>
        </form>
      </section>

      <section className="search-results shell" aria-live="polite">
        {!query ? (
          <div className="search-empty">
            <span>Start exploring</span>
            <h2>Search the entire plaza.</h2>
            <p>Try cinema, coffee, bowling, beauty, football or a store name.</p>
          </div>
        ) : resultCount === 0 ? (
          <div className="search-empty">
            <span>No matches</span>
            <h2>We couldn&apos;t find “{query}”.</h2>
            <p>Check the spelling or browse the complete mall directory.</p>
            <Link href="/stores" className="button button-dark">Browse all stores <ArrowUpRight size={16} /></Link>
          </div>
        ) : (
          <>
            <div className="search-results-heading">
              <h2>Results for “{query}”</h2>
              <span>{resultCount} {resultCount === 1 ? "result" : "results"}</span>
            </div>

            {storeResults.length > 0 && (
              <div className="search-result-group">
                <div className="search-group-label"><span>Stores & places</span><strong>{storeResults.length}</strong></div>
                <div className="search-store-grid">
                  {storeResults.map((tenant) => (
                    <Link href={tenant.internalPath ?? `/stores/${tenant.slug}`} key={tenant.slug} className="search-store-result">
                      <div className={`search-result-logo ${tenant.logo ? "has-logo" : ""}`}>
                        {tenant.logo
                          ? <Image src={tenant.logo} alt="" width={600} height={600} quality={100} unoptimized />
                          : <span style={{ color: tenant.logoColor }}>{tenant.logoText ?? tenant.name.charAt(0)}</span>}
                      </div>
                      <div>
                        <span>{tenant.category} · {tenant.detail}</span>
                        <h3>{tenant.name}</h3>
                        <p><MapPin size={13} /> {tenant.floor}</p>
                      </div>
                      <ArrowUpRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {eventResults.length > 0 && (
              <div className="search-result-group">
                <div className="search-group-label"><span>Events</span><strong>{eventResults.length}</strong></div>
                <div className="search-event-results">
                  {eventResults.map((event) => (
                    <Link href={`/events#${event.slug}`} key={event.slug}>
                      <CalendarDays />
                      <div><span>{event.type} · {event.venue}</span><h3>{event.title}</h3><p>{event.summary}</p></div>
                      <ArrowUpRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
