export const metadata = {
  title: "piHOCH2 — #fuckyouhoch2",
  description: "Radikale Täterverantwortung. Manifest • Produkte • Transzendenz."
};
import "./globals.css";
import Link from "next/link";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <main className="container">{children}</main>
        <footer className="container">
          <div className="logoRow">
            <div className="lotus"><img src="/branding/lotus_closed.svg" alt="Lotusblüte" /></div>
            <div><div>piHOCH2 (π²)</div><div className="muted">#fuckyouhoch2 — Transzendenz</div></div>
          </div>
          <nav style={{display:"flex",gap:"1rem"}}>
            <Link href="/manifest">Manifest</Link>
            <Link href="/produkte">Produkte</Link>
            <Link href="/therapeut">Therapeut</Link>
            <Link href="/recht/impressum">Impressum</Link>
            <Link href="/recht/datenschutz">Datenschutz</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
