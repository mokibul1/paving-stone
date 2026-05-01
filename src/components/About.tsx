import { SectionHeading } from "./SectionHeading";
import bench from "@/assets/product-bench.jpg";

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <div className="img-zoom aspect-[4/5] overflow-hidden shadow-luxury">
            <img src={bench} alt="Master stonemason at work" className="h-full w-full object-cover" loading="lazy" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-8 -right-4 md:-right-12 bg-secondary text-secondary-foreground p-8 md:p-10 max-w-xs shadow-deep">
            <div className="font-serif text-5xl md:text-6xl text-gold-gradient leading-none">17</div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-primary">Years</div>
            <p className="mt-4 text-sm text-secondary-foreground/70 leading-relaxed">
              Of carving heritage stone for the world's most discerning estates.
            </p>
          </div>
          <div className="absolute -top-6 -left-6 h-24 w-24 border-l-2 border-t-2 border-primary hidden md:block" />
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Heritage"
            title="A Legacy Sculpted From Stone"
          />
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Founded in a quiet quarry town, Marbella Stone Co. has grown into a name whispered among
              architects, landscape designers and estate owners who refuse the ordinary. Our atelier blends
              centuries-old hand-carving with modern precision tooling.
            </p>
            <p>
              Every commission begins with a single block of carefully selected granite — and ends with a
              piece you'll pass down to the next generation.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {[
              { v: "850+", l: "Projects" },
              { v: "32", l: "Stone Types" },
              { v: "12", l: "Countries" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-3xl text-gold-gradient">{s.v}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 bg-gold-gradient text-primary-foreground text-xs uppercase tracking-[0.3em] font-medium shimmer hover:shadow-gold-glow transition-all duration-500"
          >
            Visit Our Atelier
          </a>
        </div>
      </div>
    </section>
  );
};
