import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => { document.title = "About | Marbella Stone Co."; }, []);
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24"><About /></div>
      <Reviews />
      <Footer />
    </main>
  );
};
export default AboutPage;
