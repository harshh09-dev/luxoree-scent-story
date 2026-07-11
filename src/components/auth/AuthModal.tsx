import { useEffect, useRef, useState } from "react";
import { X, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { signInWithEmail, signUpWithEmail } from "@/hooks/use-auth";

type Mode = "signin" | "signup";

export function AuthModal({
  open,
  onClose,
  initialMode = "signin",
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setErr(null);
    setOk(null);
    const t = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    setOk(null);
    try {
      if (mode === "signin") {
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        onClose();
      } else {
        const { error } = await signUpWithEmail(email, password, name.trim() || undefined);
        if (error) throw error;
        setOk("Check your inbox to confirm your email.");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <button
        aria-label="Close auth"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-md rounded-sm border border-border/60 bg-background p-8 shadow-[0_30px_80px_rgba(201,162,76,0.15)]"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-2 text-ivory/60 hover:text-gold"
        >
          <X className="h-5 w-5" />
        </button>
        <p className="text-[10px] uppercase tracking-[0.4em] text-gold">
          {mode === "signin" ? "Welcome back" : "Join Luxorée"}
        </p>
        <h2 id="auth-title" className="mt-2 font-display text-4xl text-ivory">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h2>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <IconField icon={UserIcon} label="Full name" value={name} onChange={setName} autoComplete="name" />
          )}
          <IconField
            icon={Mail}
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <IconField
            icon={Lock}
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            required
            minLength={6}
          />

          {err && (
            <div className="rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
              {err}
            </div>
          )}
          {ok && (
            <div className="rounded-sm border border-gold/40 bg-gold/10 p-3 text-xs text-gold">{ok}</div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.3em] text-background hover:bg-gold-soft disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ivory/60">
          {mode === "signin" ? (
            <>
              New to Luxorée?{" "}
              <button onClick={() => setMode("signup")} className="text-gold hover:underline">
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have one?{" "}
              <button onClick={() => setMode("signin")} className="text-gold hover:underline">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function IconField({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  required,
  autoComplete,
  minLength,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/60">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-sm border border-border bg-background/60 px-3 focus-within:border-gold">
        <Icon className="h-4 w-4 text-gold" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          className="w-full bg-transparent py-2.5 text-sm text-ivory placeholder:text-ivory/40 focus:outline-none"
        />
      </div>
    </label>
  );
}
