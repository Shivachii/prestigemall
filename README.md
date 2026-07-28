# Prestige Plaza Nairobi

A premium, mobile-first website and interactive indoor navigation experience for Prestige Plaza on Ngong Road, Nairobi.

The product combines a retail destination website with a lightweight SVG mall map. It is designed to remain responsive on lower-end smartphones and intentionally avoids WebGL, Three.js, and heavy 3D assets.

## Features

- Responsive shopping, dining, entertainment, events, and visitor pages
- Searchable store directory with category filters
- Static tenant pages with business information and metadata
- Interactive isometric mall map for Parking, Ground, and First floors
- Search-to-location with automatic floor switching
- Clickable SVG tenant and amenity locations
- Mouse, touch, drag, and wheel map controls
- Animated indoor walking routes
- Accessible tenant details and mobile route controls
- Responsive navigation with active, hover, focus, and pressed states
- Reduced-motion support
- Static generation for tenant pages

## Technology

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Native React SVG components

## Getting started

Requirements:

- Node.js 20 or newer
- pnpm

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

Run both validation commands before submitting a change:

```bash
pnpm lint
pnpm build
```

The production build downloads the configured Google Fonts through `next/font`, so it requires network access when those fonts are not cached.

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Main Prestige Plaza destination experience |
| `/map` | Interactive indoor mall map |
| `/stores` | Searchable tenant directory |
| `/stores/[slug]` | Individual tenant pages |
| `/events` | Events and mall programming |
| `/visit` | Directions, parking, hours, and assistance |
| `/search` | Site-wide search results |
| `/privacy` | Privacy information |
| `/terms` | Website terms |

## Project structure

```text
app/
  components/           Shared icon components
  data/                 Homepage, tenant, event, and hours data
  events/               Events route
  map/                  Interactive map route and map-specific CSS
  search/               Search route
  stores/               Directory and tenant routes
  visit/                Visitor information
  globals.css           Shared visual system and responsive styles
  layout.tsx            Root layout, fonts, and metadata
  page.tsx              Homepage

components/
  mall-map/
    MallMap.tsx         Map experience shell
    MapCanvas.tsx       SVG renderer and pointer interactions
    FloorSelector.tsx   Floor switching
    SearchBar.tsx       Map location search
    TenantMarker.tsx    Interactive SVG locations
    TenantCard.tsx      Location details and route controls
    NavigationPath.tsx  Animated indoor route
    MapControls.tsx     Zoom and reset controls
    mapStore.ts         Zustand map state

data/
  floors.ts             Map floor definitions
  tenants.ts            Map geometry and location information

public/
  images/               Mall and experience photography
  logos/                Prestige and tenant logos
```

## Updating tenant content

Website tenant information is stored in:

```text
app/data/tenants.ts
```

Each entry supplies the directory and tenant profile pages. Add its logo to `public/logos` and reference it with a root-relative path such as:

```ts
logo: "/logos/example.png"
```

Map tenant geometry and map-specific details are stored separately in:

```text
data/tenants.ts
```

Coordinates use the `1020 × 650` SVG view box rendered by `MapCanvas.tsx`:

```ts
{
  id: "example-store",
  name: "Example Store",
  category: "Shopping",
  floor: "ground",
  x: 300,
  y: 280,
  width: 120,
  height: 80,
  description: "Store description",
  hours: "9:00 AM – 8:00 PM",
  destination: true
}
```

Keep map IDs unique across all floors. When a map location has a website tenant profile, add its map ID and tenant slug to `storeProfiles` in `components/mall-map/TenantCard.tsx`.

## Updating floors and routes

Floor labels and descriptions live in `data/floors.ts`.

The simplified navigation paths are generated in:

```text
components/mall-map/NavigationPath.tsx
```

Routes use SVG paths with animated `stroke-dasharray` and `stroke-dashoffset`. When changing the floor layout, update the route coordinates so they continue to follow visible corridors.

## Interaction and accessibility

- Every SVG tenant marker supports pointer and keyboard selection.
- Map pointer capture is guarded for Android touch cancellation.
- Visible focus states are provided for links, controls, cards, and navigation.
- The mobile location panel collapses after route activation so it does not obscure the map.
- Motion-heavy elements respect `prefers-reduced-motion`.
- Interactive images include accessible names or SVG title and description elements.

## Environment

The canonical site URL can be configured for generated metadata:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
```

Without it, metadata defaults to `http://localhost:3000`.

Do not commit local `.env` files.

## Deployment

The application is suitable for Vercel or another Node.js-compatible Next.js host.

For Vercel:

1. Import the repository.
2. Select pnpm as the package manager.
3. Add `NEXT_PUBLIC_SITE_URL` to the production environment.
4. Use `pnpm build` as the build command.
5. Deploy the generated Next.js application.

## Content roadmap

Tenant and map data currently use local typed modules. The component boundaries are ready for these sources to be replaced by Sanity and PostgreSQL/Prisma data without rewriting the map renderer. Before enabling a CMS, preserve the existing `MapTenant` and tenant page data shapes at the query boundary.
