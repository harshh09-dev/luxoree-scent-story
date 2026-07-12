import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Truck, Wallet, Clock, MessageCircle } from "lucide-react";
import { z } from "zod";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/api/orders";
import type { PaymentMethod } from "@/lib/api/types";
import { SITE } from "@/lib/site";

type UIPaymentMethod = PaymentMethod | "whatsapp";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Luxorée" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const customerSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a 10-digit Indian mobile number"),
  line1: z.string().trim().min(4, "Address required").max(200),
  line2: z.string().trim().max(200).optional(),
  landmark: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().trim().regex(/^\d{6}$/, "Valid 6-digit pincode required"),
  notes: z.string().trim().max(500).optional(),
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<UIPaymentMethod>("cod");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    line1: "", line2: "", landmark: "", city: "", state: "Rajasthan", pincode: "",
    notes: "",
  });

  const sub = subtotal();
  const shipping = sub === 0 ? 0 : sub >= SITE.shipping.freeShippingOver ? 0 : SITE.shipping.flatRate;
  const total = sub + shipping;

  if (items.length === 0) {
    return (
      <div className="container-luxe py-24 text-center">
        <h1 className="font-display text-4xl text-ivory">Your cart is empty</h1>
        <Link to="/shop" className="mt-6 inline-block rounded-sm bg-gold px-6 py-3 text-xs uppercase tracking-[0.25em] text-background">Return to shop</Link>
      </div>
    );
  }

  const set = <K extends keyof typeof form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const buildWhatsAppUrl = (orderId: string) => {
    const linesText = items.map((i) => `• ${i.name} (${i.size}) × ${i.qty} — ₹${i.unitPrice * i.qty}`).join("%0A");
    const msg =
      `Hi Luxorée! I'd like to confirm my order.%0A%0A` +
      `Order: *${orderId}*%0A` +
      `Name: ${form.name}%0A` +
      `Phone: +91${form.phone}%0A` +
      `Address: ${form.line1}${form.line2 ? ", " + form.line2 : ""}${form.landmark ? " (Near " + form.landmark + ")" : ""}, ${form.city}, ${form.state} — ${form.pincode}%0A%0A` +
      `Items:%0A${linesText}%0A%0A` +
      `Subtotal: ₹${sub}%0AShipping: ${shipping === 0 ? "Free" : "₹" + shipping}%0A*Total: ₹${total}*%0A%0A` +
      `Please confirm and share payment link.`;
    const phone = SITE.owner.phoneE164.replace(/\D/g, "");
    return `https://wa.me/${phone}?text=${msg}`;
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    const parsed = customerSchema.safeParse(form);
    if (!parsed.success) {
      setErr(parsed.error.issues[0]?.message ?? "Please review the form.");
      return;
    }

    if (payment === "razorpay") {
      setErr("Razorpay is coming soon. Please choose Cash on Delivery or WhatsApp for now.");
      return;
    }

    setBusy(true);
    try {
      const c = parsed.data;
      const combinedNotes = [
        c.landmark ? `Landmark: ${c.landmark}` : null,
        payment === "whatsapp" ? "Customer chose WhatsApp payment flow." : null,
        c.notes ? c.notes : null,
      ].filter(Boolean).join(" • ");

      const order = await createOrder({
        customer: {
          name: c.name,
          email: c.email,
          phone: `+91${c.phone}`,
          address: {
            line1: c.line1,
            line2: c.line2,
            city: c.city,
            state: c.state,
            pincode: c.pincode,
            country: "IN",
          },
        },
        lines: items.map((i) => ({
          slug: i.slug, name: i.name, size: i.size, unitPrice: i.unitPrice, qty: i.qty,
        })),
        subtotal: sub,
        shipping,
        discount: 0,
        total,
        paymentMethod: "cod",
        notes: combinedNotes || undefined,
      });

      if (payment === "whatsapp") {
        window.open(buildWhatsAppUrl(order.id), "_blank", "noopener,noreferrer");
      }
      clear();
      navigate({ to: "/order-success/$id", params: { id: order.id } });
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "Could not place order. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container-luxe py-16 md:py-24">
      <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Checkout</p>
      <h1 className="mt-2 font-display text-5xl text-ivory md:text-6xl">Almost yours.</h1>

      <form onSubmit={placeOrder} className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-10">
          {/* Customer */}
          <section>
            <h2 className="font-display text-2xl text-ivory">1. Contact & Shipping</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} required />
              <Field label="Mobile number" value={form.phone} onChange={(v) => set("phone", v)} required placeholder="10 digits" />
              <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required className="md:col-span-2" />
              <Field label="Address line 1" value={form.line1} onChange={(v) => set("line1", v)} required className="md:col-span-2" />
              <Field label="Address line 2 (optional)" value={form.line2} onChange={(v) => set("line2", v)} className="md:col-span-2" />
              <Field label="Landmark (optional)" value={form.landmark} onChange={(v) => set("landmark", v)} placeholder="Near ___" className="md:col-span-2" />
              <Field label="City" value={form.city} onChange={(v) => set("city", v)} required />
              <Field label="State" value={form.state} onChange={(v) => set("state", v)} required />
              <Field label="Pincode" value={form.pincode} onChange={(v) => set("pincode", v)} required placeholder="6 digits" />
            </div>
            <div className="mt-4">
              <label className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">Order notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Delivery preferences, gift wrap…"
                className="mt-1 w-full rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              />
            </div>
          </section>

          {/* Payment */}
          <section>
            <h2 className="font-display text-2xl text-ivory">2. Payment</h2>
            <div className="mt-5 grid gap-3">
              <PayOption
                selected={payment === "cod"}
                onSelect={() => setPayment("cod")}
                icon={Truck}
                label="Cash on Delivery"
                desc="Pay in cash when your order arrives. No online payment needed."
                badge="Recommended"
              />
              <PayOption
                selected={payment === "whatsapp"}
                onSelect={() => setPayment("whatsapp")}
                icon={MessageCircle}
                label="Order via WhatsApp"
                desc="Confirm your order on WhatsApp and receive a UPI payment link from us."
              />
              <PayOption
                selected={payment === "razorpay"}
                onSelect={() => setPayment("razorpay")}
                icon={Wallet}
                label="Razorpay (Cards, UPI, Wallets)"
                desc="Coming soon."
                disabled
              />
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-sm border border-border/50 bg-surface/40 p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-2xl text-ivory">Your order</h2>
          <ul className="mt-4 divide-y divide-border/40">
            {items.map((i) => (
              <li key={`${i.slug}-${i.size}`} className="flex items-center gap-3 py-3">
                <img src={i.image} alt={i.name} className="h-14 w-12 rounded-sm object-cover" />
                <div className="flex-1">
                  <div className="text-sm text-ivory">{i.name}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold">{i.size} × {i.qty}</div>
                </div>
                <div className="text-sm text-ivory">₹{i.unitPrice * i.qty}</div>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2 border-t border-border/40 pt-4 text-sm">
            <div className="flex justify-between text-ivory/70"><span>Subtotal</span><span>₹{sub}</span></div>
            <div className="flex justify-between text-ivory/70"><span>Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
            <div className="mt-3 flex items-baseline justify-between border-t border-border/40 pt-3">
              <span className="text-base text-ivory">Total</span>
              <span className="font-display text-3xl text-gold">₹{total}</span>
            </div>
          </div>

          {err && (
            <div className="mt-4 rounded-sm border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            Place order
          </button>
          <p className="mt-3 flex items-center justify-center gap-1 text-[10px] uppercase tracking-[0.2em] text-ivory/50">
            <Clock className="h-3 w-3" /> Ships in 24 hours
          </p>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label, value, onChange, required, type = "text", placeholder, className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-sm border border-border bg-background/60 px-3 py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
      />
    </label>
  );
}

function PayOption({
  selected, onSelect, icon: Icon, label, desc, badge, disabled,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  desc: string;
  badge?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onSelect}
      disabled={disabled}
      className={`flex items-start gap-4 rounded-sm border p-5 text-left transition-all ${
        selected ? "border-gold bg-gold/10" : "border-border hover:border-gold/60"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <Icon className="mt-0.5 h-5 w-5 text-gold" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg text-ivory">{label}</span>
          {badge && <span className="rounded-sm bg-gold/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">{badge}</span>}
        </div>
        <p className="mt-1 text-xs text-ivory/60">{desc}</p>
      </div>
    </button>
  );
}
