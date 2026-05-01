import { Phone, MessageCircle } from "lucide-react";

const PHONE = "+918217257354"; // tel: format
const WHATSAPP = "918217257354"; // wa.me format (no +)

export const FloatingContact = () => {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-3">
      <a
        href={`https://wa.me/${WHATSAPP}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group h-14 w-14 rounded-full bg-[#25D366] text-white inline-flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 ring-2 ring-white/20"
      >
        <MessageCircle className="h-6 w-6" fill="currentColor" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-50 animate-ping -z-10" />
      </a>
      <a
        href={`tel:${PHONE}`}
        aria-label="Call us"
        className="group h-14 w-14 rounded-full bg-gold-gradient text-primary-foreground inline-flex items-center justify-center shadow-gold-glow hover:scale-110 transition-transform duration-300 ring-2 ring-white/20"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
};
