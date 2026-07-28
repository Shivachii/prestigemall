import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function SvgIcon({ children, size = 24, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return <SvgIcon {...props}><path d="M5 12h13M13 6l6 6-6 6" /></SvgIcon>;
}

export function ArrowLeft(props: IconProps) {
  return <SvgIcon {...props}><path d="M19 12H6m5-6-6 6 6 6" /></SvgIcon>;
}

export function ArrowDown(props: IconProps) {
  return <SvgIcon {...props}><path d="M12 5v13m-6-5 6 6 6-6" /></SvgIcon>;
}

export function ArrowUpRight(props: IconProps) {
  return <SvgIcon {...props}><path d="M7 17 17 7M8 7h9v9" /></SvgIcon>;
}

export function X(props: IconProps) {
  return <SvgIcon {...props}><path d="m6 6 12 12M18 6 6 18" /></SvgIcon>;
}

export function Menu(props: IconProps) {
  return <SvgIcon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></SvgIcon>;
}

export function Search(props: IconProps) {
  return <SvgIcon {...props}><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4 4" /></SvgIcon>;
}

export function Clock3(props: IconProps) {
  return <SvgIcon {...props}><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></SvgIcon>;
}

export function MapPin(props: IconProps) {
  return <SvgIcon {...props}><path d="M20 10c0 5.2-8 11-8 11s-8-5.8-8-11a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></SvgIcon>;
}

export function CalendarDays(props: IconProps) {
  return <SvgIcon {...props}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M7 14h2M12 14h2M17 14h.1M7 18h2M12 18h2" /></SvgIcon>;
}

export function ShoppingBag(props: IconProps) {
  return <SvgIcon {...props}><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></SvgIcon>;
}

export function Ticket(props: IconProps) {
  return <SvgIcon {...props}><path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z" /><path d="M12 8v2M12 14v2" /></SvgIcon>;
}

export function Utensils(props: IconProps) {
  return <SvgIcon {...props}><path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10M16 3v18M16 3c3 2 4 5 4 8h-4" /></SvgIcon>;
}

export function ShieldCheck(props: IconProps) {
  return <SvgIcon {...props}><path d="M12 3 20 6v5c0 5-3.3 8.5-8 10-4.7-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></SvgIcon>;
}

export function Smartphone(props: IconProps) {
  return <SvgIcon {...props}><rect x="6.5" y="2.5" width="11" height="19" rx="2" /><path d="M10 5h4M11 18.5h2" /></SvgIcon>;
}

export function Users(props: IconProps) {
  return <SvgIcon {...props}><circle cx="9" cy="8" r="3" /><path d="M3.5 20v-2c0-3 2.4-5 5.5-5s5.5 2 5.5 5v2M16 5.5a3 3 0 0 1 0 5.5M17 13c2.3.5 3.5 2.2 3.5 4.5V20" /></SvgIcon>;
}

export function RefreshCw(props: IconProps) {
  return <SvgIcon {...props}><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8.5A7 7 0 0 1 18.8 7L20 12M4 12l1.2 5A7 7 0 0 0 17.9 15.5" /></SvgIcon>;
}
