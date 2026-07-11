import { supabase } from "@/integrations/supabase/client";
import type { Address, CreateOrderInput, Order, OrderStatus, PaymentMethod, PaymentStatus } from "./types";

type OrderRow = {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: Order["customer"]["address"];
  subtotal: number | string;
  shipping: number | string;
  discount: number | string;
  total: number | string;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  status: OrderStatus;
  coupon_code: string | null;
  notes: string | null;
  created_at: string;
};

type OrderItemRow = {
  slug: string;
  name: string;
  size: string;
  unit_price: number | string;
  qty: number;
};

const n = (v: number | string) => (typeof v === "number" ? v : Number(v));

function rowToOrder(order: OrderRow, items: OrderItemRow[]): Order {
  return {
    id: order.order_number,
    status: order.status,
    paymentStatus: order.payment_status,
    createdAt: order.created_at,
    customer: {
      name: order.customer_name,
      email: order.customer_email,
      phone: order.customer_phone,
      address: order.address,
    },
    lines: items.map((i) => ({
      slug: i.slug,
      name: i.name,
      size: i.size as Order["lines"][number]["size"],
      unitPrice: n(i.unit_price),
      qty: i.qty,
    })),
    subtotal: n(order.subtotal),
    shipping: n(order.shipping),
    discount: n(order.discount),
    total: n(order.total),
    paymentMethod: order.payment_method,
    couponCode: order.coupon_code ?? undefined,
    notes: order.notes ?? undefined,
  };
}

/** POST /orders — persists to Lovable Cloud. Works for signed-in and guest customers. */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id ?? null;

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      customer_name: input.customer.name,
      customer_email: input.customer.email,
      customer_phone: input.customer.phone,
      address: input.customer.address as unknown as OrderRow["address"] & Record<string, unknown>,
      subtotal: input.subtotal,
      shipping: input.shipping,
      discount: input.discount,
      total: input.total,
      payment_method: input.paymentMethod,
      coupon_code: input.couponCode ?? null,
      notes: input.notes ?? null,
    })
    .select("*")
    .single();

  if (error || !order) throw new Error(error?.message ?? "Could not create order.");

  const itemsPayload = input.lines.map((l) => ({
    order_id: order.id,
    slug: l.slug,
    name: l.name,
    size: l.size,
    unit_price: l.unitPrice,
    qty: l.qty,
  }));
  const { data: items, error: itemsErr } = await supabase
    .from("order_items")
    .insert(itemsPayload)
    .select("slug,name,size,unit_price,qty");
  if (itemsErr) throw new Error(itemsErr.message);

  return rowToOrder(order as OrderRow, (items ?? []) as OrderItemRow[]);
}

/** GET /orders/:orderNumber */
export async function getOrder(orderNumber: string): Promise<Order | null> {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("order_number", orderNumber)
    .maybeSingle();
  if (error || !order) return null;

  const { data: items } = await supabase
    .from("order_items")
    .select("slug,name,size,unit_price,qty")
    .eq("order_id", order.id);

  return rowToOrder(order as OrderRow, (items ?? []) as OrderItemRow[]);
}

/** GET /orders — orders for the signed-in user (by user_id OR customer_email fallback). */
export async function listMyOrders(): Promise<Order[]> {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return [];

  const query = supabase
    .from("orders")
    .select("*")
    .or(`user_id.eq.${user.id},customer_email.eq.${user.email ?? ""}`)
    .order("created_at", { ascending: false });

  const { data: orders, error } = await query;
  if (error || !orders) return [];

  const ids = orders.map((o) => o.id);
  if (ids.length === 0) return [];
  const { data: allItems } = await supabase
    .from("order_items")
    .select("order_id,slug,name,size,unit_price,qty")
    .in("order_id", ids);

  const byOrder = new Map<string, OrderItemRow[]>();
  for (const it of (allItems ?? []) as (OrderItemRow & { order_id: string })[]) {
    const arr = byOrder.get(it.order_id) ?? [];
    arr.push(it);
    byOrder.set(it.order_id, arr);
  }
  return (orders as OrderRow[]).map((o) => rowToOrder(o, byOrder.get(o.id) ?? []));
}
