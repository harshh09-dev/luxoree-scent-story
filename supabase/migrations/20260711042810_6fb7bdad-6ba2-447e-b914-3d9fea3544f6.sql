-- Pin search_path on remaining functions
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE OR REPLACE FUNCTION public.assign_order_number()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := 'LUX-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.order_seq')::text, 5, '0');
  END IF;
  RETURN NEW;
END; $$;

-- Restrict direct execution of SECURITY DEFINER functions (still usable via triggers/policies)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- has_role must remain callable by authenticated for policy evaluation? Policies bypass grants,
-- so revoke here to prevent direct RPC while policies still work.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;

-- Tighten guest insert policies (replace USING(true)/CHECK(true) with real invariants)
DROP POLICY IF EXISTS "orders insert any" ON public.orders;
CREATE POLICY "orders insert guest or self" ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(customer_name) BETWEEN 1 AND 120
    AND char_length(customer_email) BETWEEN 3 AND 320
    AND char_length(customer_phone) BETWEEN 6 AND 20
    AND total >= 0
    AND (user_id IS NULL OR user_id = auth.uid())
  );

DROP POLICY IF EXISTS "order_items insert any" ON public.order_items;
CREATE POLICY "order_items insert with order" ON public.order_items FOR INSERT TO anon, authenticated
  WITH CHECK (
    qty > 0 AND unit_price >= 0
    AND EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id)
  );

DROP POLICY IF EXISTS "reviews insert any" ON public.reviews;
CREATE POLICY "reviews insert validated" ON public.reviews FOR INSERT TO anon, authenticated
  WITH CHECK (
    rating BETWEEN 1 AND 5
    AND char_length(text) BETWEEN 3 AND 2000
    AND char_length(name) BETWEEN 1 AND 120
    AND status = 'pending'
    AND (user_id IS NULL OR user_id = auth.uid())
  );