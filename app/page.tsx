import { DirectorySection } from "./components/home/DirectorySection";
import { EventsSection } from "./components/home/EventsSection";
import { HomeChrome } from "./components/home/HomeNavigation";
import {
  DiscoverSection,
  InsideSection,
  PlanDaySection,
  QuickAccess,
} from "./components/home/HomeSections";
import { HomeFooter, VisitSection } from "./components/home/VisitFooter";
import { getTodayHours } from "./data/hours";

export default function Home() {
  const today = getTodayHours();

  return (
    <main className="home-page">
      <HomeChrome />
      <QuickAccess todayHours={today.hours} />
      <DirectorySection />
      <PlanDaySection />
      <DiscoverSection />
      <EventsSection />
      <InsideSection />
      <VisitSection today={today} />
      <HomeFooter />
    </main>
  );
}
