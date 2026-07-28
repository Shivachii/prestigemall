export type Tenant = {
  slug: string;
  name: string;
  category: "Shopping" | "Dining" | "Entertainment" | "Services";
  detail: string;
  floor: string;
  description: string;
  logo?: string;
  logoText?: string;
  logoColor?: string;
  externalUrl?: string;
  externalLabel?: string;
  internalPath?: string;
  tagline?: string;
  phones?: string[];
  whatsapp?: string;
  website?: string;
  hours?: string;
  features?: string[];
};

export const tenants: Tenant[] = [
  { slug: "home-and-beyond", name: "Home & Beyond", category: "Shopping", detail: "Home goods store", floor: "First floor", description: "Explore considered furniture, décor and practical pieces for every room.", logo: "/logos/homeandbeyond.png", phones: ["020 7904000"], website: "https://www.homeandbeyond.co.ke" },
  { slug: "safaricom", name: "Safaricom", category: "Services", detail: "Mobile & technology", floor: "First floor", description: "Visit the Safaricom store for devices, connectivity and customer support.", logo: "/logos/safaricom.png" },
  { slug: "airtel", name: "Airtel", category: "Services", detail: "Mobile & technology", floor: "Ground floor", description: "Find Airtel mobile services, devices and in-store customer assistance.", logo: "/logos/airtel.svg" },
  { slug: "java-house", name: "Java House", category: "Dining", detail: "Coffee & casual dining", floor: "Ground floor", description: "Coffee, breakfast and familiar favourites for meetings, quick stops and relaxed meals.", logo: "/logos/java.svg" },
  { slug: "naivas", name: "Naivas", category: "Shopping", detail: "Supermarket", floor: "Ground floor", description: "Everyday groceries, fresh produce, home essentials and more in one convenient stop.", logo: "/logos/naivas-supermarket-seeklogo.png" },
  { slug: "playza", name: "Playza", category: "Entertainment", detail: "Gaming court", floor: "Second floor", description: "Bowling, games, parties and entertainment for families, friends and friendly competition.", logo: "/logos/playza.png", phones: ["0706 288 120"], features: ["Bowling", "Bumper cars", "Mini golf", "Karaoke", "Pool tables", "Foosball", "Arcade", "VR", "Party rooms"] },
  { slug: "prestige-cinema", name: "Prestige Cinema", category: "Entertainment", detail: "Movies & premieres", floor: "Second floor", tagline: "Home of the blockbusters", description: "Kenya's most preferred movie theatre, bringing the latest films and big-screen moments to Prestige Plaza.", logo: "/logos/prestigecinema.png", phones: ["0706 777 303"], whatsapp: "0717 602 246", externalUrl: "https://prestigecinema.vercel.app", externalLabel: "Book tickets", internalPath: "/store/cinema" },
  { slug: "beerbirds", name: "Beerbirds", category: "Dining", detail: "Sports bar", floor: "First floor", tagline: "Big games, epic bar food and great beer", description: "A lively sports bar at Prestige Plaza with big-screen TVs, great beer and crowd-pleasing bar food. Guests must be 18 or older.", logo: "/logos/beerbirds.png", phones: ["0719 288 120"], features: ["Live sports", "Big-screen TVs", "Burgers", "Pizza", "Chicken", "Great beer selection", "Age 18+"] },
  { slug: "american-tourister", name: "American Tourister", category: "Shopping", detail: "Travel & luggage", floor: "Ground floor", description: "Luggage and travel essentials designed for weekends away and longer journeys.", logo: "/logos/americantourister.png", phones: ["0792 688 376"] },
  { slug: "touch-de-rose", name: "Touch de Rose", category: "Services", detail: "Laundry & garment care", floor: "Ground floor", tagline: "Nairobi's premier laundry expert", description: "Professional laundry and garment care with collection, delivery and same-day service available.", logo: "/logos/touchderose.png", website: "https://www.touchderose.com", hours: "Open daily, 8:00 AM to 8:00 PM", features: ["Collection & delivery", "Same-day service available", "Professional garment care"] },
  { slug: "tried-and-true-menswear", name: "Tried & True Menswear", category: "Shopping", detail: "Men's fashion", floor: "First floor", tagline: "Timeless style for the modern man", description: "Bold fits, clean cuts and elevated contemporary menswear for the modern man.", logo: "/logos/triedandtrue.png", phones: ["0745 442 702"], whatsapp: "0745 442 702", features: ["Bold fits", "Clean cuts", "Elevated menswear"] },
  { slug: "omar-modern-carpets-and-furniture", name: "Omar Modern Carpets & Furniture", category: "Shopping", detail: "Home & interiors", floor: "First floor", description: "Find carpets, furniture and interior pieces designed to bring a room together.", logo: "/logos/omarmodernfurnitures.png" },
  { slug: "melkev-fashions", name: "Melkev Fashions", category: "Shopping", detail: "Fashion & accessories", floor: "First floor", tagline: "Timeless style, effortless elegance", description: "Browse timeless fashion, accessories and elegant pieces for a refreshed wardrobe.", logo: "/logos/melkevfashions.webp", phones: ["0722 927 489"], whatsapp: "0733 860 068" },
  { slug: "urban-hair-studio", name: "Urban Hair Studio", category: "Services", detail: "Hair salon", floor: "First floor", description: "A full-service hair salon offering styling, colour, protective styles, nails and natural hair care.", logo: "/logos/urbanhairstudio.png", phones: ["0748 913 007"], website: "https://urbanhair.co.ke", features: ["Texlax", "Hair colouring", "Curly perm", "Micro links", "Sew-in", "Braiding", "Nails", "Natural hair", "Silk press"] },
  { slug: "bata", name: "Bata", category: "Shopping", detail: "Footwear & accessories", floor: "Ground floor", description: "Shop familiar footwear, accessories and practical styles for the whole family.", logo: "/logos/bata.png" },
  { slug: "fonexpress", name: "Fonexpress", category: "Services", detail: "Mobile & technology", floor: "First floor", description: "Mobile devices, accessories and multi-brand authorized phone repair services.", logo: "/logos/fonexpress.png", whatsapp: "0788 740 000" },
  { slug: "ozana-beauty", name: "Ozana Beauty", category: "Shopping", detail: "Beauty & personal care", floor: "Ground floor", description: "Discover the best of lips, makeup and beauty products for everyday routines and special occasions.", logoText: "Ozana", logoColor: "#E2934A", website: "https://ozanabeauty.com", hours: "Open Monday to Sunday", features: ["Lip products", "Makeup", "Beauty essentials"] },
  { slug: "the-daily-cafe-and-bistro", name: "The Daily Café & Bistro", category: "Dining", detail: "Café & bistro", floor: "Ground floor", description: "Meet over coffee, casual plates and relaxed bistro dining throughout the day.", logo: "/logos/dailycafebistro.png" },
  { slug: "food-patio", name: "Food Patio", category: "Dining", detail: "Continental eatery", floor: "First floor", description: "Enjoy continental dishes and relaxed casual meals at Prestige Plaza.", logo: "/logos/foodpatio.png", phones: ["0701 288 120", "0741 288 120"], features: ["Continental dishes", "Casual dining"] },
];

export function getTenant(slug: string) {
  return tenants.find((tenant) => tenant.slug === slug);
}
