import { whatsappLink } from "@/content/site";
import { SocialIcon } from "@/components/ui/SocialIcons";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-105"
    >
      <SocialIcon name="whatsapp" className="size-7" />
    </a>
  );
}
