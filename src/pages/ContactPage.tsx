import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { useEffect } from "react";

const ContactPage = () => {
  useEffect(() => { document.title = "Contact | Marbella Stone Co."; }, []);
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24"><Contact /></div>
      <Footer />
    </main>
  );
};
export default ContactPage;
