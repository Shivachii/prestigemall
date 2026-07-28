export type MallEvent = {
  slug: string;
  day: string;
  month: string;
  title: string;
  type: string;
  time: string;
  venue: string;
  summary: string;
  details?: string[];
};

export const mallEvents: MallEvent[] = [
  {
    slug: "world-cup-final-watch-party",
    day: "18",
    month: "JUL",
    title: "World Cup Final Watch Party",
    type: "Live football",
    time: "Sunday from 10:00 PM",
    venue: "Beerbirds & Prestige Cinema",
    summary: "Experience the World Cup final on the big screen with Beerbirds and Prestige Cinema at Prestige Plaza.",
    details: ["Tickets from KSh 550", "KSh 650 ticket option", "Big-screen viewing", "Beerbirds", "Prestige Cinema"],
  },
  {
    slug: "cue-and-crew-pool-tournament",
    day: "03",
    month: "JUL",
    title: "Cue & Crew Pool Tournament",
    type: "Pool tournament",
    time: "KSh 2,000 entry",
    venue: "Beerbirds",
    summary: "A 32-player pool tournament with cash prizes and free entry for spectators.",
    details: ["Paybill 542542", "Account 360361", "Spectator entry is free"],
  },
  {
    slug: "africa-day",
    day: "25",
    month: "MAY",
    title: "Africa Day",
    type: "Culture & community",
    time: "Prestige Plaza",
    venue: "Prestige Plaza",
    summary: "A celebration of African culture and community at Prestige Plaza.",
  },
  {
    slug: "semi-final-watch-party",
    day: "05",
    month: "MAY",
    title: "Champions League Semi-Final Watch Party",
    type: "Champions League",
    time: "10:00 PM",
    venue: "Beerbirds",
    summary: "Watch the UEFA Champions League semi-final live with great food, cold drinks and fellow football fans.",
  },
];

export const featuredEvent: MallEvent = {
  slug: "fathers-day-world-cup-watch-party",
  day: "TBA",
  month: "",
  title: "World Cup Watch Party",
  type: "Live football",
  time: "Father's Day weekend",
  venue: "Beerbirds & Playza",
  summary: "Football, family and fun come together with live matches, great food, cold drinks and memorable family moments.",
};
