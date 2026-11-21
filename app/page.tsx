import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { QrFloat } from "@/components/ui/QrFloat";
import { mobileApp } from "@/data/mobileApp";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { TaxServices } from "@/components/sections/TaxServices";
import { DigitalServices } from "@/components/sections/DigitalServices";
import { MediaSection } from "@/components/sections/MediaSection";
import { MobileApp } from "@/components/sections/MobileApp";
import { Pricing } from "@/components/sections/Pricing";
import { ClientsPartners } from "@/components/sections/ClientsPartners";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <DigitalServices />
        <TaxServices />
        <MediaSection />
        <MobileApp />
        <Pricing />
        <ClientsPartners />
        <News />
        <Contact />
      </main>
      <Footer />
      <QrFloat targetId={mobileApp.id} src="/img/mobileApp/qr.png" label="Scan to download the Tax Advisor app" />
    </>
  );
}
