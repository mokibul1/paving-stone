import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeading = ({ eyebrow, title, subtitle, align = "center", className }: SectionHeadingProps) => (
  <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
    {eyebrow && (
      <div className={cn("flex items-center gap-3 mb-5", align === "center" && "justify-center")}>
        <span className="h-px w-10 bg-gold-gradient" />
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-medium">{eyebrow}</span>
        <span className="h-px w-10 bg-gold-gradient" />
      </div>
    )}
    <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed font-light">
        {subtitle}
      </p>
    )}
  </div>
);
