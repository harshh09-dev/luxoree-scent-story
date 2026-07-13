import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, MapPin, ShieldCheck, Truck, Wallet, Package } from "lucide-react";
import { SITE } from "@/lib/site";

const trustBadges = [
  { icon: Truck, label: "Free Delivery within 3 km of Mahesh Nagar, Jaipur" },
  { icon: Wallet, label: "Cash on Delivery Available" },
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: Package, label: "Premium Packaging" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/40 bg-black/40">
      <div className="border-b border-border/40">
        <div className="container-luxe grid gap-4 py-8 md:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10">
                <Icon className="h-4 w-4 text-gold" />
              </span>
              <p className="text-[11px] uppercase leading-relaxed tracking-[0.22em] text-ivory/75">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl tracking-[0.35em] text-gold">LUXORÉE</div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-ivory/60">{SITE.tagline}</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/70">
            Hand-blended premium fragrances. Made in {SITE.owner.location.split(",")[0]}. Loved across India.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={SITE.owner.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-ivory/70 transition-colors hover:border-gold hover:text-gold">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.owner.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-ivory/70 transition-colors hover:border-gold hover:text-gold">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={`mailto:${SITE.owner.email}`} aria-label="Email"
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-ivory/70 transition-colors hover:border-gold hover:text-gold">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Shop</h3>
          <ul className="space-y-3 text-sm text-ivory/75">
            <li><Link to="/shop" className="hover:text-gold">All Fragrances</Link></li>
            <li><Link to="/collections" className="hover:text-gold">Collections</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "discovery-sets" }} className="hover:text-gold">Discovery Sets</Link></li>
            <li><Link to="/collections/$slug" params={{ slug: "gift-boxes" }} className="hover:text-gold">Gift Collections</Link></li>
            <li><Link to="/cart" className="hover:text-gold">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Company</h3>
          <ul className="space-y-3 text-sm text-ivory/75">
            <li><Link to="/about" className="hover:text-gold">About Luxorée</Link></li>
            <li><a href={SITE.owner.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">Lookbook</a></li>
            <li><a href="mailto:luxoreeperfumes@gmail.com?subject=Shipping" className="hover:text-gold">Shipping</a></li>
            <li><a href="mailto:luxoreeperfumes@gmail.com?subject=Returns" className="hover:text-gold">Returns</a></li>
            <li><a href="mailto:luxoreeperfumes@gmail.com" className="hover:text-gold">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-ivory/75">
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 h-4 w-4 text-gold" />
              <a href={SITE.owner.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
                WhatsApp: {SITE.owner.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 text-gold" />
              <a href={`mailto:${SITE.owner.email}`} className="hover:text-gold">{SITE.owner.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <Instagram className="mt-0.5 h-4 w-4 text-gold" />
              <a href={SITE.owner.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
                @{SITE.owner.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              {SITE.owner.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-5 text-xs text-ivory/50 md:flex-row">
          <p>© {new Date().getFullYear()} Luxorée Perfumes • Founded by {SITE.owner.name}.</p>
          <p className="tracking-[0.15em]">Crafted with intent in India</p>
        </div>
      </div>
    </footer>
  );
}
