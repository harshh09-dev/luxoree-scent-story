import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Package, MessageCircle, Mail, Copy, Truck, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { getOrder } from "@/lib/api/orders";
import type { Order } from "@/lib/api/types";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/order-success/$id")({
  loader: async ({ params }) => {
    const o = await getOrder(params.id);
    if (!o) throw notFound();
    return o;
  },
  head: ({ params }) => ({
    meta: [
      { title: `Order ${params.id} confirmed — Luxorée` },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-luxe py-24 text-center">
      <p className="font-display text-3xl text-ivory">Order not found</p>
      <Link to="/" className="mt-6 inline-block text-xs uppercase tracking-[0.25em] text-gold">Go home</Link>
    </div>
  ),
  component: OrderSuccess,
});

function OrderSuccess() {
  const order = Route.useLoaderData() as Order;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Analytics placeholder — send purchase event
    // window.gtag?.("event", "purchase", { transaction_id: order.id, value: order.total });
  }, []);

  const copyId = () => {
    navigator.clipboard.writeText(order.id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="container-luxe py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gold/15">
          <Check className="h-8 w-8 text-gold" />
        </div>
        <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-gold">Order Placed</p>
        <h1 className="mt-2 font-display text-5xl text-ivory md:text-6xl">
          Thank you, {order.customer.name.split(" ")[0]}.
        </h1>
        <p className="mt-4 max-w-xl text-base text-ivory/70">
          We've received your order and will confirm on WhatsApp shortly.
          You'll get shipping updates on {order.customer.phone} and {order.customer.email}.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="rounded-sm border border-gold/50 bg-gold/10 px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Order ID</p>
            <p className="font-display text-2xl text-ivory">{order.id}</p>
          </div>
          <button
            onClick={copyId}
            className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-3 text-xs uppercase tracking-[0.25em] text-ivory/80 hover:border-gold hover:text-gold"
          >
            <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <NextStep icon={MessageCircle} title="WhatsApp confirmation" desc="You'll receive a message from us shortly." />
          <NextStep icon={Package} title="Packed with care" desc="Hand-packed in premium boxes within 24 hours." />
          <NextStep icon={Truck} title="Shipped in 3–5 days" desc="Tracking link will be sent via WhatsApp + email." />
        </div>

        <div className="mt-10 rounded-sm border border-border/50 bg-surface/40 p-6">
          <h2 className="font-display text-2xl text-ivory">Order Summary</h2>
          <ul className="mt-4 divide-y divide-border/40">
            {order.lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm text-ivory">{l.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{l.size} × {l.qty}</div>
                </div>
                <div className="text-sm text-ivory">₹{l.unitPrice * l.qty}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 border-t border-border/40 pt-4 text-sm">
            <div className="flex justify-between text-ivory/70"><span>Subtotal</span><span>₹{order.subtotal}</span></div>
            <div className="flex justify-between text-ivory/70"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span></div>
            <div className="flex justify-between border-t border-border/40 pt-3">
              <span className="font-display text-lg text-ivory">Total</span>
              <span className="font-display text-2xl text-gold">₹{order.total}</span>
            </div>
            <div className="mt-2 flex justify-between text-xs text-ivory/60">
              <span>Payment</span>
              <span className="uppercase tracking-[0.2em]">
                {order.paymentMethod === "cod" ? "Cash on Delivery" : "Razorpay"} • {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-sm border border-border/50 bg-surface/40 p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Shipping to</p>
            <p className="mt-2 text-sm text-ivory">{order.customer.name}</p>
            <p className="text-sm text-ivory/70">
              {order.customer.address.line1}
              {order.customer.address.line2 ? `, ${order.customer.address.line2}` : ""}<br />
              {order.customer.address.city}, {order.customer.address.state} {order.customer.address.pincode}<br />
              {order.customer.phone}
            </p>
          </div>
          <div className="rounded-sm border border-border/50 bg-surface/40 p-5">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Need help?</p>
            <p className="mt-2 text-sm text-ivory">Reach out anytime.</p>
            <div className="mt-3 space-y-2 text-sm">
              <a href={SITE.owner.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-ivory hover:text-gold">
                <MessageCircle className="h-4 w-4 text-gold" /> {SITE.owner.phone}
              </a>
              <a href={`mailto:${SITE.owner.email}?subject=Order ${order.id}`} className="flex items-center gap-2 text-ivory hover:text-gold">
                <Mail className="h-4 w-4 text-gold" /> {SITE.owner.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-ivory hover:border-gold hover:text-gold"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NextStep({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-sm border border-border/40 bg-surface/40 p-5">
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-3 font-display text-lg text-ivory">{title}</p>
      <p className="mt-1 text-xs text-ivory/60">{desc}</p>
    </div>
  );
}
