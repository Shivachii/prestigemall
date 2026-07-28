"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  ShoppingBag,
  Ticket,
  Utensils,
} from "../icons";
import { getNairobiOpenStatus } from "../../data/hours";

const experiences = [
  {
    title: "Dining, elevated",
    copy: "From unhurried coffee to after-dark dining, discover flavours made for every kind of moment.",
    image: "/images/scenery/food.jpg",
    alt: "A plated meal being served at a dining table",
    link: "Explore dining",
  },
  {
    title: "Let the games begin",
    copy: "Arcade favourites, immersive play and more, all under one roof at Playza, Prestige Plaza's gaming court.",
    image: "/images/scenery/bowling.jpg",
    alt: "A bowling ball approaching illuminated pins",
    link: "Discover Playza",
  },
];

export function QuickAccess({ todayHours }: { todayHours: string }) {
  const [openStatus, setOpenStatus] = useState<ReturnType<typeof getNairobiOpenStatus> | null>(null);

  useEffect(() => {
    const updateStatus = () => setOpenStatus(getNairobiOpenStatus());
    updateStatus();
    const timer = window.setInterval(updateStatus, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      className="quick-access shell"
      aria-label="Quick visitor information"
    >
      <Link href="/visit#directions">
        <MapPin />
        <span>Our location</span>
        <strong>Ngong Road, Nairobi</strong>
      </Link>
      <a href="#visit">
        <Clock3 />
        <span>{openStatus?.label ?? "Today’s hours"}</span>
        <strong suppressHydrationWarning>{openStatus?.detail ?? todayHours}</strong>
      </a>
      <Link href="/visit">
        <ShoppingBag />
        <span>Parking</span>
        <strong>Visitor information</strong>
      </Link>
      <Link href="/visit#assistance">
        <ArrowUpRight />
        <span>Need help?</span>
        <strong>Visitor assistance</strong>
      </Link>
      <Link href="/visit">
        <Ticket />
        <span>Your safety</span>
        <strong>Security assistance</strong>
      </Link>
    </section>
  );
}

export function DiscoverSection() {
  return (
    <>
      <section className="intro shell section" id="discover">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="eyebrow">The Prestige experience</p>
          <h2>
            Everything you love,
            <br />
            <em>all in one place.</em>
          </h2>
        </motion.div>
        <div className="intro-side">
          <p>
            From Naivas and Home & Beyond to Java House, Prestige Cinema and
            Playza, everyday essentials and memorable experiences live side by
            side.
          </p>
          <Link className="text-link" href="/stores">
            Explore the directory <ArrowRight size={17} />
          </Link>
        </div>
      </section>
      <section className="experience-grid shell">
        {experiences.map((item, index) => (
          <motion.article
            className="experience-card"
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.12 }}
          >
            <Image
              src={item.image}
              fill
              alt={item.alt}
              sizes="(max-width: 800px) 100vw, 50vw"
              quality={90}
            />
            <div className="card-shade" />
            <div className="card-copy">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <a href="#directory">
                {item.link} <ArrowUpRight size={17} />
              </a>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  );
}

const plans = [
  {
    href: "/store/cinema",
    icon: Ticket,
    title: "Catch a movie",
    copy: "See what's showing at Prestige Cinema and choose your seats.",
    action: "View showtimes",
  },
  {
    href: "/map?destination=playza&route=1",
    icon: ShoppingBag,
    title: "Play at Playza",
    copy: "Make time for games, friendly competition and family fun.",
    action: "Plan your visit",
  },
  {
    href: "/stores?category=Dining",
    icon: Utensils,
    title: "Meet over a meal",
    copy: "From Java coffee to Beerbirds and the Food Court.",
    action: "Explore dining",
  },
  {
    href: "/visit",
    icon: MapPin,
    title: "Arrive with ease",
    copy: "Find directions, parking information and opening hours.",
    action: "Visitor information",
  },
];

export function PlanDaySection() {
  return (
    <section
      className="plan-day section shell"
      aria-labelledby="plan-day-title"
    >
      <div className="plan-day-heading">
        <p className="eyebrow">Make it yours</p>
        <h2 id="plan-day-title">
          Plan a day that
          <br />
          <em>feels effortless.</em>
        </h2>
      </div>
      <div className="plan-day-grid">
        {plans.map(({ href, icon: Icon, title, copy, action }, index) => (
          <Link href={href} className="plan-card" key={title}>
            <span>0{index + 1}</span>
            <Icon />
            <h3>{title}</h3>
            <p>{copy}</p>
            <strong>
              {action} <ArrowUpRight size={15} />
            </strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function InsideSection() {
  return (
    <section className="inside section shell" aria-labelledby="inside-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Inside Prestige</p>
          <h2 id="inside-title">
            A place for
            <br />
            every kind of day.
          </h2>
        </div>
        <p className="inside-intro">
          Meet for coffee, find the everyday essentials, catch a film or make an
          afternoon of it with the family.
        </p>
      </div>
      <div className="inside-grid">
        <figure className="inside-tile inside-wide">
          <Image
            src="/images/scenery/exterior-enhanced-v2.png"
            alt="Prestige Plaza entrance and Ngong Road in Nairobi"
            fill
            sizes="(max-width: 700px) 100vw, 65vw"
            quality={90}
          />
          <figcaption>
            <span>01</span> The mall
          </figcaption>
        </figure>
        <figure className="inside-tile">
          <Image
            src="/images/scenery/naivas.jpg"
            alt="Bakery and fresh food market inside Naivas"
            fill
            sizes="(max-width: 700px) 100vw, 35vw"
            quality={90}
          />
          <figcaption>
            <span>02</span> Naivas
          </figcaption>
        </figure>
        <figure className="inside-tile">
          <Image
            src="/images/scenery/bowling.jpg"
            alt="Illuminated bowling lane and pins at Playza"
            fill
            sizes="(max-width: 700px) 100vw, 35vw"
            quality={90}
          />
          <figcaption>
            <span>03</span> Playza
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
