import { SectionHeading } from "./SectionHeading";
import { Hammer, Compass, Truck, Shield, Sparkles, Ruler } from "lucide-react";

const services = [
  { icon: Compass, title: "Bespoke Design", desc: "Custom granite & stone designs tailored to your villa, garden, or estate." },
  { icon: Hammer, title: "Master Craftsmanship", desc: "Hand-carved by artisans with decades of stoneworking heritage." },
  { icon: Ruler, title: "On-Site Surveying", desc: "Precise measurement and 3D visualization before a single cut is made." },
  { icon: Truck, title: "White-Glove Delivery", desc: "Insured transport and professional installation across the region." },
  { icon: Sparkles, title: "Restoration & Polish", desc: "Bring heritage stonework back to its original gleam and grandeur." },
  { icon: Shield, title: "Lifetime Guarantee", desc: "Premium-grade granite backed by our lifetime structural warranty." },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background relative">
      <div className="container">
        <SectionHeading
          eyebrow="Our Atelier"
          title="Crafted Stone, Curated Service"
          subtitle="From the first sketch to the final polish — every project is treated as a one-of-one commission."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative bg-background p-10 transition-all duration-700 hover:bg-secondary cursor-default"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute top-0 left-0 h-px w-0 bg-gold-gradient transition-all duration-700 group-hover:w-full" />
              <div className="relative">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full border border-primary/30 text-primary group-hover:bg-gold-gradient group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-500">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium group-hover:text-primary-glow transition-colors duration-500">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-secondary-foreground/80 transition-colors duration-500">
                  {s.desc}
                </p>
                <div className="mt-6 text-[10px] uppercase tracking-[0.3em] text-primary/70">
                  0{i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
