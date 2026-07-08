import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle, Mail, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/40 bg-black/40">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl tracking-[0.35em] text-gold">LUXOREE</div>
          <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-ivory/60">Live Luxuriously</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/70">
            Handcrafted premium fragrances inspired by luxury. Made in India. Loved by thousands.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube, MessageCircle].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full border gold-hairline text-ivory/70 transition-colors hover:border-gold hover:text-gold"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Shop</h3>
          <ul className="space-y-3 text-sm text-ivory/75">
            <li><Link to="/shop" className="hover:text-gold">All Fragrances</Link></li>
            <li><Link to="/shop" search={{}} className="hover:text-gold">Men's Collection</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Women's Collection</Link></li>
            <li><Link to="/shop" className="hover:text-gold">Unisex Collection</Link></li>
            <li><Link to="/shop" className="hover:text-gold">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Company</h3>
          <ul className="space-y-3 text-sm text-ivory/75">
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/quiz" className="hover:text-gold">Fragrance Finder</Link></li>
            <li><a href="#" className="hover:text-gold">Reviews</a></li>
            <li><a href="#" className="hover:text-gold">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-gold">Returns &amp; Refunds</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">Contact</h3>
          <ul className="space-y-3 text-sm text-ivory/75">
            <li className="flex items-start gap-2"><MessageCircle className="mt-0.5 h-4 w-4 text-gold" /> WhatsApp: +91 98765 43210</li>
            <li className="flex items-start gap-2"><Mail className="mt-0.5 h-4 w-4 text-gold" /> hello@luxoree.in</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> Bengaluru, India</li>
            <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 text-gold" /> Secure Packaging • COD Available</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/40">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-5 text-xs text-ivory/50 md:flex-row">
          <p>© {new Date().getFullYear()} Luxoree Perfumes. All rights reserved.</p>
          <p className="tracking-[0.15em]">Crafted with intent in India</p>
        </div>
      </div>
    </footer>
  );
}
