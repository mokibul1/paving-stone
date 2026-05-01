import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { publicApi } from "@/lib/api";

const Workflow = () => {
  const [steps, setSteps] = useState<any[]>([]);
  useEffect(() => {
    document.title = "How We Craft | Marbella Stone Co.";
    publicApi.list("workflow_steps", { orderBy: "step_number" }).then(setSteps).catch(() => undefined);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-secondary text-secondary-foreground pt-36 pb-16">
        <div className="container text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary">The Craft</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white mt-4 leading-[1.05]">
            How We <span className="italic text-gold-gradient">Build It</span>
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto mt-6 text-sm md:text-base">
            From quarry to your terrace — every Marbella piece passes through six meticulous stages of craftsmanship.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="space-y-20">
            {steps.map((s, i) => (
              <div key={s.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i%2===1?"lg:[&>*:first-child]:order-2":""}`}>
                <div className="aspect-[4/3] overflow-hidden bg-secondary img-zoom shadow-luxury">
                  <img src={s.image_url || "/placeholder.svg"} alt={s.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <span className="font-serif text-7xl text-gold-gradient leading-none block">0{s.step_number}</span>
                  {s.duration_label && <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mt-3 inline-block">{s.duration_label}</span>}
                  <h2 className="font-serif text-3xl md:text-4xl mt-4">{s.title}</h2>
                  <p className="text-foreground/70 mt-4 leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Workflow;
