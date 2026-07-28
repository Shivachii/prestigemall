import Link from "next/link";
import { ArrowLeft } from "../components/icons";

export const metadata = { title:"Terms | Prestige Plaza" };
export default function TermsPage(){
  return <main className="status-page"><section className="status-page-content shell">
    <p className="eyebrow">Legal</p><h1>Terms of use</h1>
    <p>Information on this website is provided for visitor planning. Tenant hours, events, offers and availability may change. Confirm time-sensitive details directly with the relevant business before travelling.</p>
    <div><Link href="/" className="text-link"><ArrowLeft size={16}/> Return home</Link></div>
  </section></main>;
}
