"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MapPin, Menu, Search, ShoppingBag, X } from "../icons";
import { Logo } from "./Logo";

type NavigationProps = {
  activeSection: string;
  menuOpen: boolean;
  notice: boolean;
  searchOpen: boolean;
  onDismissNotice: () => void;
  onMenuOpen: () => void;
  onMenuClose: () => void;
  onSearchOpen: () => void;
  onSearchClose: () => void;
};

export function HomeChrome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notice, setNotice] = useState(true);
  const [activeSection, setActiveSection] = useState("discover");

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const sections = ["discover", "events", "directory", "visit"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, .15, .4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigationProps = {
    activeSection,
    menuOpen,
    notice,
    searchOpen,
    onDismissNotice: () => setNotice(false),
    onMenuOpen: () => setMenuOpen(true),
    onMenuClose: () => setMenuOpen(false),
    onSearchOpen: () => setSearchOpen(true),
    onSearchClose: () => setSearchOpen(false),
  };

  return (
    <>
      <Announcement visible={notice} onDismiss={navigationProps.onDismissNotice} />
      <Hero {...navigationProps} />
      <HomeOverlays {...navigationProps} />
    </>
  );
}

export function Announcement({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  if (!visible) return null;
  return (
    <div className="notice">
      <p><span>NEW</span> Weekend parking is free after 5 PM</p>
      <button onClick={onDismiss} aria-label="Dismiss announcement"><X size={15} /></button>
    </div>
  );
}

export function Hero({
  activeSection,
  notice,
  onMenuOpen,
  onSearchOpen,
}: Pick<NavigationProps, "activeSection" | "notice" | "onMenuOpen" | "onSearchOpen">) {
  return (
    <section className="hero">
      <header className={`nav shell ${notice ? "with-notice" : ""}`}>
        <Logo />
        <nav aria-label="Primary navigation">
          <Link href="/stores">Directory</Link>
          <Link href="/events">What&apos;s on</Link>
          <a href="#discover" className={activeSection === "discover" ? "active" : ""} aria-current={activeSection === "discover" ? "location" : undefined}>Discover</a>
          <Link href="/visit">Visit</Link>
        </nav>
        <div className="nav-actions">
          <button onClick={onSearchOpen} aria-label="Search"><Search size={19} /></button>
          <Link href="/map" className="nav-directory">Interactive map <ArrowUpRight size={16} /></Link>
          <button className="menu-button" onClick={onMenuOpen} aria-label="Open menu"><Menu size={23} /></button>
        </div>
      </header>

      <div className="hero-layout shell">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
          <p className="eyebrow">Prestige Plaza · Nairobi</p>
          <h1>More than a mall.<br /><em>It&apos;s Prestige.</em></h1>
          <div className="feather-sweep" aria-hidden="true"><i /><i /><i /></div>
          <p className="hero-intro">Prestige Plaza is Nairobi&apos;s destination for shopping, dining and entertainment, beautifully brought together on Ngong Road.</p>
          <div className="hero-links">
            <a href="#discover" className="button button-gold">Explore Prestige <ArrowRight size={17} /></a>
            <Link href="/events" className="text-link">See what&apos;s on <ArrowDown size={17} /></Link>
          </div>
        </motion.div>
        <motion.div className="hero-cards" initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: .25 }}>
          <figure className="hero-card hero-card-main">
            <Image src="/images/scenery/exterior-enhanced-v2.png" alt="Prestige Plaza entrance and Ngong Road in Nairobi" fill priority sizes="(max-width: 900px) 100vw, 42vw" quality={90} />
            <figcaption><span>Discover</span> Prestige Plaza</figcaption>
          </figure>
          <figure className="hero-card">
            <Image src="/images/scenery/naivas.jpg" alt="Naivas bakery and fresh food market at Prestige Plaza" fill sizes="(max-width: 900px) 50vw, 20vw" quality={90} />
            <figcaption><span>Shop</span> Naivas</figcaption>
          </figure>
          <figure className="hero-card">
            <Image src="/images/scenery/bowling.jpg" alt="Illuminated bowling lane and pins at Playza" fill sizes="(max-width: 900px) 50vw, 20vw" quality={90} />
            <figcaption><span>Play</span> Playza</figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeOverlays(props: NavigationProps) {
  const menuItems = [
    ["Discover", "#discover"],
    ["Shopping", "/stores?category=Shopping"],
    ["Dining", "/stores?category=Dining"],
    ["Entertainment", "/stores?category=Entertainment"],
    ["What's on", "/events"],
    ["Interactive map", "/map"],
    ["Visit", "/visit"],
  ];
  return (
    <>
      <AnimatePresence>
        {props.menuOpen && (
          <motion.div className="overlay-menu" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ type: "spring", damping: 25 }}>
            <div className="overlay-top shell"><Logo light /><button onClick={props.onMenuClose}><X /></button></div>
            <nav>
              {menuItems.map(([label, href], index) => (
                <motion.div key={label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .18 + index * .06 }}>
                  <Link href={href} onClick={props.onMenuClose} aria-current={href === `#${props.activeSection}` ? "location" : undefined}>
                    <span>0{index + 1}</span>{label}<ArrowUpRight />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
        {props.searchOpen && (
          <motion.div className="search-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="search-close" onClick={props.onSearchClose}><X /></button>
            <form action="/search" method="get">
              <p className="eyebrow light">What are you looking for?</p>
              <label><Search /><input autoFocus name="q" type="search" placeholder="Search Prestige" /></label>
              <span>Try “cinema”, “lunch” or “kids activities”</span>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="mobile-nav" aria-label="Mobile navigation">
        <a href="#discover" className={props.activeSection === "discover" ? "active" : ""} aria-current={props.activeSection === "discover" ? "location" : undefined}><ShoppingBag /><span>Discover</span></a>
        <Link href="/events"><CalendarDays /><span>What&apos;s on</span></Link>
        <button className={props.searchOpen ? "active" : ""} aria-expanded={props.searchOpen} onClick={props.onSearchOpen}><Search /><span>Search</span></button>
        <Link href="/map"><MapPin /><span>Map</span></Link>
      </nav>
    </>
  );
}
