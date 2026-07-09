import { Link } from "@tanstack/react-router";
import { Instagram, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { perfumes } from "@/data/perfumes";
import { SITE } from "@/lib/site";

/**
 * Editorial Lookbook — replaces the old Instagram gallery.
 * Masonry-style asymmetric grid, hover reveals product name.
 */
export function Lookbook() {
  // Asymmetric heights: alternate tall / regular for a magazine feel.
  const heights = ["h-[420px]", "h-[320px]", "h-[380px]", "h-[300px]", "h-[360px]", "h-[440px]", "h-[300px]", "h-[380px]"];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">The Lookbook</p>
            <h2 className="mt-3 font-display text-5xl leading-[1] text-ivory md:text-7xl">
              Eight <em className="text-gold not-italic">Signatures.</em><br />
              One <em className="italic">private</em> world.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ivory/70">
              A visual journal of the collection — hand-shot on obsidian,
              lit like a still life, made to be worn.
            </p>
          </div>
          <a
            href={SITE.owner.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-sm border border-gold/50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            <Instagram className="h-4 w-4" />
            Follow @{SITE.owner.instagramHandle}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-4 [column-fill:_balance]">
          {perfumes.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="mb-5 break-inside-avoid"
            >
              <Link
                to="/shop/$slug"
                params={{ slug: p.slug }}
                className={`group relative block ${heights[i % heights.length]} overflow-hidden rounded-sm border border-border/40 bg-black`}
                aria-label={`View ${p.name}`}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold">{p.family}</p>
                  <p className="mt-1 font-display text-2xl leading-tight text-ivory">{p.name}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-ivory/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    View fragrance <ArrowUpRight className="h-3.5 w-3.5" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
