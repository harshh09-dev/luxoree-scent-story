import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Luxorée — Hand-Blended Fragrances from Jaipur" },
      { name: "description", content: "Founded by Naman Sharma in Jaipur. Luxorée hand-blends premium Eau de Parfums with 25–30% parfum concentration." },
      { property: "og:title", content: "About Luxorée" },
      { property: "og:description", content: "Hand-blended luxury fragrances made in Jaipur, India." },
      { property: "og:url", content: `${SITE.domain}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/about` }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-luxe py-20 md:py-32">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Our Story</p>
        <h1 className="mt-3 max-w-3xl font-display text-5xl leading-[1.05] text-ivory md:text-7xl">
          Luxury shouldn't be a<br /> luxury.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ivory/75">
          Luxorée was founded in Jaipur by {SITE.owner.name} with one belief:
          the fragrances that make you feel most yourself shouldn't cost a week's salary.
          We compose our juice at the same 25–30% parfum concentration you'd find in a
          niche house — but skip the ad spend, the department-store rent, and the
          middlemen. What you pay for is the scent.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-10 border-y border-border/40 py-14 md:grid-cols-3">
        {[
          { n: "01", t: "Small-batch", d: "Every 500ml batch is composed and matured in our Jaipur atelier over 4–6 weeks." },
          { n: "02", t: "Skin-safe", d: "Every note meets IFRA-51 international skin-safety standards. Cruelty-free." },
          { n: "03", t: "Honest pricing", d: "Direct-to-you pricing — no distributor markup, no celebrity endorsements." },
        ].map((p) => (
          <div key={p.n}>
            <div className="font-display text-4xl text-gold/60">{p.n}</div>
            <h3 className="mt-3 font-display text-2xl text-ivory">{p.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ivory/65">{p.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Founder & Contact</p>
        <h2 className="mt-3 font-display text-4xl text-ivory md:text-5xl">Get in touch.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <ContactCard icon={MessageCircle} label="WhatsApp" value={SITE.owner.phone} href={SITE.owner.whatsappUrl} />
          <ContactCard icon={Mail} label="Email" value={SITE.owner.email} href={`mailto:${SITE.owner.email}`} />
          <ContactCard icon={Instagram} label="Instagram" value={`@${SITE.owner.instagramHandle}`} href={SITE.owner.instagramUrl} />
          <ContactCard icon={MapPin} label="Atelier" value={SITE.owner.location} />
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  icon: Icon, label, value, href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-sm border border-border/50 bg-surface/40 p-5 transition-colors hover:border-gold/60">
      <Icon className="mt-0.5 h-5 w-5 text-gold" />
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{label}</p>
        <p className="mt-1 text-lg text-ivory">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : inner;
}
