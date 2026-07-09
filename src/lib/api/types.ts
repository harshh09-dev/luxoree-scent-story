// Shared API types (mirrors the backend contract in BACKEND.md).

import type { CartSize } from "@/lib/cart";

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  country: "IN";
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  address: Address;
};

export type OrderLine = {
  slug: string;
  name: string;
  size: CartSize;
  unitPrice: number;
  qty: number;
};

export type PaymentMethod = "cod" | "razorpay";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type CreateOrderInput = {
  customer: Customer;
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
};

export type Order = CreateOrderInput & {
  id: string;               // e.g. LUX-2026-0001
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;        // ISO
};

export type ReviewInput = {
  productSlug: string;
  name: string;
  email?: string;
  rating: number;   // 1..5
  text: string;
};

export type ReviewCreated = {
  id: string;
  productSlug: string;
  name: string;
  rating: number;
  text: string;
  createdAt: string;
  status: "pending" | "approved";
};
