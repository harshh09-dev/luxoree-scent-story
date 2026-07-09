import { apiFetch, HAS_BACKEND } from "./client";
import type { CreateOrderInput, Order } from "./types";

/**
 * POST /api/orders — create a new order.
 * Backend responsibilities (see BACKEND.md):
 *   1. validate payload
 *   2. persist Order + Customer
 *   3. trigger WhatsApp (customer + owner) via Twilio
 *   4. trigger email (customer + owner) via Resend
 *   5. for razorpay: create order and return razorpayOrderId
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  if (HAS_BACKEND) {
    return apiFetch<Order>("/api/orders", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  // Local mock — persist to localStorage so the confirmation + tracking pages work
  await new Promise((r) => setTimeout(r, 700));
  const id = `LUX-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  const order: Order = {
    ...input,
    id,
    status: "placed",
    paymentStatus: input.paymentMethod === "cod" ? "pending" : "pending",
    createdAt: new Date().toISOString(),
  };
  const stored = JSON.parse(localStorage.getItem("luxoree-orders") ?? "[]") as Order[];
  localStorage.setItem("luxoree-orders", JSON.stringify([order, ...stored]));
  return order;
}

/** GET /api/orders/:id */
export async function getOrder(id: string): Promise<Order | null> {
  if (HAS_BACKEND) {
    try {
      return await apiFetch<Order>(`/api/orders/${id}`);
    } catch {
      return null;
    }
  }
  const stored = JSON.parse(localStorage.getItem("luxoree-orders") ?? "[]") as Order[];
  return stored.find((o) => o.id === id) ?? null;
}
