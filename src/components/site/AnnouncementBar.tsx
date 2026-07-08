import { Flame, Truck, Sparkles } from "lucide-react";

const items = [
  { icon: Flame, text: "Today's Flash Offer — 20ml Trial Bottle ₹99" },
  { icon: Sparkles, text: "50ml Now ₹349 (MRP ₹499) — Limited Stock" },
  { icon: Truck, text: "Free Delivery Within 3KM • Cash on Delivery" },
  { icon: Flame, text: "Handcrafted in India • Long Lasting 6–10 Hours" },
];

export function AnnouncementBar() {
  const doubled = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-b border-border/40 bg-black/60 backdrop-blur-sm">
      <div className="marquee-track flex gap-12 whitespace-nowrap py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/70">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-2">
            <it.icon className="h-3 w-3 text-gold" />
            {it.text}
          </span>
        ))}
      </div>
    </div>
  );
}
