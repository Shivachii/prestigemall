import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, MapPin } from "../../components/icons";
import { getTenant, tenants } from "../../data/tenants";
import { notFound } from "next/navigation";

type StorePageProps = { params: Promise<{ slug: string }> };

function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:${digits.startsWith("0") ? `+254${digits.slice(1)}` : `+${digits}`}`;
}

function whatsappHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.startsWith("0") ? `254${digits.slice(1)}` : digits}`;
}

export function generateStaticParams() {
  return tenants.map((tenant) => ({ slug: tenant.slug }));
}

export async function generateMetadata({ params }: StorePageProps): Promise<Metadata> {
  const tenant = getTenant((await params).slug);
  if (!tenant) return {};
  return {
    title: `${tenant.name} | Prestige Plaza`,
    description: `${tenant.description} Find ${tenant.name} at Prestige Plaza Nairobi.`,
  };
}

export default async function StorePage({ params }: StorePageProps) {
  const tenant = getTenant((await params).slug);
  if (!tenant) notFound();

  const related = tenants
    .filter((item) => item.category === tenant.category && item.slug !== tenant.slug)
    .slice(0, 3);

  return (
    <main className="store-detail-page">
      <header className="subpage-nav shell">
        <Link href="/" className="subpage-logo">
          <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
        </Link>
        <Link href="/stores" className="back-link"><ArrowLeft size={16} /> All stores</Link>
      </header>

      <section className="store-detail-hero shell">
        <div className="store-detail-copy">
          <p className="eyebrow">{tenant.category}</p>
          <h1>{tenant.name}</h1>
          {tenant.tagline && <strong className="store-tagline">{tenant.tagline}</strong>}
          <p>{tenant.description}</p>
          <div className="store-actions">
            <a
              href={tenant.externalUrl ?? tenant.website ?? "#visit-store"}
              target={tenant.externalUrl || tenant.website ? "_blank" : undefined}
              rel={tenant.externalUrl || tenant.website ? "noopener noreferrer" : undefined}
              className="button button-dark"
            >
              {tenant.externalUrl ? (tenant.externalLabel ?? "Visit website") : tenant.website ? "Visit website" : "Plan your visit"} <ArrowRight size={16} />
            </a>
            {tenant.whatsapp && (
              <a href={whatsappHref(tenant.whatsapp)} target="_blank" rel="noopener noreferrer" className="store-contact-link">
                WhatsApp {tenant.whatsapp}
              </a>
            )}
          </div>
        </div>
        <div className={`store-identity store-identity-${tenant.category.toLowerCase()} ${tenant.logo ? "has-logo" : ""} ${tenant.logoText ? "has-wordmark" : ""}`}>
          {tenant.logo
            ? <Image src={tenant.logo} alt={`${tenant.name} logo`} width={1254} height={1254} sizes="500px" quality={100} unoptimized />
            : tenant.logoText
              ? <span style={{ color: tenant.logoColor }}>{tenant.logoText}</span>
              : <span>{tenant.name.charAt(0)}</span>}
          <small>{tenant.detail}</small>
        </div>
      </section>

      <section className="store-facts shell" id="visit-store">
        <div><MapPin /><span>Location</span><strong>{tenant.floor}</strong></div>
        <div><Clock3 /><span>{tenant.hours ? "Opening hours" : "Mall opening time"}</span><strong>{tenant.hours ?? "Daily at 7:00 AM"}</strong></div>
        <div>
          <ArrowRight />
          <span>Contact</span>
          {tenant.phones?.length
            ? <strong className="fact-links">{tenant.phones.map((phone) => <a href={phoneHref(phone)} key={phone}>{phone}</a>)}</strong>
            : tenant.whatsapp
              ? <strong><a href={whatsappHref(tenant.whatsapp)} target="_blank" rel="noopener noreferrer">{tenant.whatsapp}</a></strong>
              : <strong>Visit in person</strong>}
        </div>
      </section>

      {tenant.features && (
        <section className="store-offerings shell">
          <p className="eyebrow">At {tenant.name}</p>
          <h2>What you&apos;ll find.</h2>
          <div>
            {tenant.features.map((feature, index) => (
              <article key={feature}><span>{(index + 1).toString().padStart(2, "0")}</span><h3>{feature}</h3></article>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="related-stores shell">
          <div className="section-heading">
            <div><p className="eyebrow">Keep exploring</p><h2>More in {tenant.category.toLowerCase()}.</h2></div>
          </div>
          <div className="store-page-grid">
            {related.map((item) => (
              <Link
                href={item.internalPath ?? `/stores/${item.slug}`}
                className="store-page-card"
                key={item.slug}
              >
                <div className={`store-page-mark ${item.logo ? "has-logo" : ""} ${item.logoText ? "has-wordmark" : ""}`}>
                  {item.logo
                    ? <Image src={item.logo} alt={`${item.name} logo`} width={1024} height={1024} sizes="110px" quality={100} unoptimized />
                    : item.logoText
                      ? <span style={{ color: item.logoColor }}>{item.logoText}</span>
                      : item.name.charAt(0)}
                </div>
                <div><span>{item.detail}</span><h3>{item.name}</h3><p>{item.floor}</p></div>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
