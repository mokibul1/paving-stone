import { Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import sjLogo from "@/assets/sj-logo.jpeg";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-primary/20">
      <div className="container py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <img src={sjLogo} alt="SJ Enterprises logo" className="h-20 w-auto bg-white p-2 rounded" />
          <div className="font-serif text-2xl text-gold-gradient mt-4">SJ Enterprises</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-secondary-foreground/60 mt-1">Driven by Vision · Powered by Passion</div>
          <p className="mt-6 text-sm text-secondary-foreground/70 max-w-md leading-relaxed">
            A luxury granite and stone atelier crafting bespoke pieces for the world's most exceptional estates.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 rounded-full border border-primary/30 inline-flex items-center justify-center text-primary hover:bg-gold-gradient hover:text-primary-foreground hover:border-transparent transition-all duration-500"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-5">Explore</div>
          <ul className="space-y-3 text-sm text-secondary-foreground/80">
            {[
              { l: "Products", to: "/products" },
              { l: "Categories", to: "/categories" },
              { l: "Workflow", to: "/workflow" },
              { l: "About", to: "/about" },
              { l: "Contact", to: "/contact" },
            ].map((x) => (
              <li key={x.l}><Link to={x.to} className="link-gold hover:text-primary transition-colors">{x.l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary mb-5">Contact</div>
          <ul className="space-y-3 text-sm text-secondary-foreground/80">
            <li>India</li>
            <li>+91 82172 57354 (WhatsApp)</li>
            <li>granitepavingstone@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/50">
          <div>© {new Date().getFullYear()} SJ Enterprises. All rights reserved.</div>
          <div>Crafted with reverence for stone.</div>
        </div>
      </div>
    </footer>
  );
};
