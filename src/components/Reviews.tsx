import { useEffect, useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { publicApi } from "@/lib/api";

type Review = { id: string; author_name: string; author_role: string | null; content: string; rating: number };

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    publicApi.list<Review>("reviews", { featured: true, orderBy: "created_at" }).then(setReviews).catch(() => undefined);
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const t = setInterval(() => setI((v) => (v + 1) % reviews.length), 6000);
    return () => clearInterval(t);
  }, [reviews.length]);

  if (reviews.length === 0) return null;
  const r = reviews[i];

  return (
    <section id="reviews" className="py-24 md:py-32 bg-dark-gradient text-secondary-foreground relative overflow-hidden">
      <Quote className="absolute top-20 left-10 h-40 w-40 text-primary/10" />
      <Quote className="absolute bottom-20 right-10 h-40 w-40 text-primary/10 rotate-180" />

      <div className="container relative">
        <SectionHeading eyebrow="Voices Of Our Clients" title="Words Etched In Stone" />

        <div className="mt-16 max-w-3xl mx-auto text-center min-h-[260px]">
          <div key={r.id} className="animate-fade-in">
            <div className="flex justify-center gap-1 text-primary mb-8">
              {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed italic">
              "{r.content}"
            </p>
            <div className="mt-10">
              <div className="font-serif text-xl text-gold-gradient">{r.author_name}</div>
              {r.author_role && <div className="text-[10px] uppercase tracking-[0.3em] text-secondary-foreground/60 mt-2">{r.author_role}</div>}
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={() => setI((v) => (v - 1 + reviews.length) % reviews.length)}
            className="h-12 w-12 rounded-full border border-primary/40 text-primary hover:bg-gold-gradient hover:text-primary-foreground hover:border-transparent transition-all duration-500 inline-flex items-center justify-center" aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, k) => (
              <button key={k} onClick={() => setI(k)}
                className={`h-px transition-all duration-500 ${k === i ? "w-12 bg-gold-gradient" : "w-6 bg-secondary-foreground/30"}`} aria-label={`Go to review ${k + 1}`} />
            ))}
          </div>
          <button onClick={() => setI((v) => (v + 1) % reviews.length)}
            className="h-12 w-12 rounded-full border border-primary/40 text-primary hover:bg-gold-gradient hover:text-primary-foreground hover:border-transparent transition-all duration-500 inline-flex items-center justify-center" aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
