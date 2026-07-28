import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
} from "../components/icons";
import { operationHours } from "../data/hours";

const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Prestige+Plaza+Ngong+Road+Nairobi";

export const metadata: Metadata = {
  title: "Visitor Information | Prestige Plaza",
  description: "Plan your visit to Prestige Plaza on Ngong Road, Nairobi. Find opening hours, directions, parking, public transport and visitor assistance.",
};

const visitorDetails = [
  {
    icon: MapPin,
    title: "Matatu & bus",
    copy: "Use a Ngong Road route and ask to alight at Prestige Plaza. Confirm your route and fare with the operator before travelling.",
  },
  {
    icon: Smartphone,
    title: "Boda & ride-hailing",
    copy: "Set Prestige Plaza, Ngong Road as your destination and use the designated arrival area near the main entrance.",
  },
  {
    icon: ShoppingBag,
    title: "Parking",
    copy: "On-site visitor parking is available. Follow the arrival signage and guidance from the parking team.",
  },
  {
    icon: ShieldCheck,
    title: "Security & assistance",
    copy: "Security personnel are available throughout the mall. Speak to the nearest team member if you need help during your visit.",
  },
];

export default function VisitPage() {
  return (
    <main className="visit-page">
      <header className="subpage-nav shell">
        <Link href="/" className="subpage-logo">
          <Image src="/logos/prestige-logo-nobg.png" alt="Prestige" width={1536} height={1024} priority quality={100} unoptimized />
        </Link>
        <Link href="/" className="back-link"><ArrowLeft size={16} /> Back home</Link>
      </header>

      <section className="visit-page-hero shell" id="directions">
        <div>
          <p className="eyebrow">Plan your visit</p>
          <h1>Everything you need<br />before you arrive.</h1>
          <p>Prestige Plaza is located on Ngong Road in Nairobi, with shopping, dining and entertainment open seven days a week.</p>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="button button-dark">
            Open in Google Maps <ArrowUpRight size={16} />
          </a>
        </div>
        <figure>
          <Image src="/images/scenery/prestige-exterior-enhanced.png" alt="Exterior of Prestige Plaza on Ngong Road" fill priority sizes="(max-width: 900px) 100vw, 48vw" quality={90} />
          <figcaption><MapPin size={15} /> Ngong Road, Nairobi</figcaption>
        </figure>
      </section>

      <section className="visit-quick shell" id="assistance">
        {visitorDetails.map(({ icon: Icon, title, copy }) => (
          <article key={title}>
            <Icon />
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="visit-hours-page shell" id="hours">
        <div className="visit-hours-copy">
          <p className="eyebrow">Opening hours</p>
          <h2>Open every day.</h2>
          <p>Individual restaurants, entertainment venues and stores may operate different hours. Check directly with the tenant when planning a specific visit.</p>
        </div>
        <div className="visit-hours-table">
          {operationHours.map((entry) => (
            <div key={entry.day}>
              <span>{entry.day}</span>
              <strong>{entry.hours}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="directions-banner">
        <div className="shell">
          <div>
            <p className="eyebrow light">Ready when you are</p>
            <h2>We&apos;ll see you at Prestige.</h2>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="button button-outline">
            Get directions <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
