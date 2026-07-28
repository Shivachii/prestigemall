import Link from "next/link";
import { ArrowLeft } from "../components/icons";

export const metadata = { title:"Privacy | Prestige Plaza" };
export default function PrivacyPage(){
  return <main className="status-page"><section className="status-page-content shell">
    <p className="eyebrow">Legal</p><h1>Privacy</h1>
    <p>Prestige Plaza only uses information you choose to provide for enquiries, updates and visitor services. We do not sell personal information. Contact mall management if you would like to access or remove information you have submitted.</p>
    <div><Link href="/" className="text-link"><ArrowLeft size={16}/> Return home</Link></div>
  </section></main>;
}
