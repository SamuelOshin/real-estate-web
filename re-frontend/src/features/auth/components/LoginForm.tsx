"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useAuth } from "@/features/auth/hooks/useAuth";

const DEMO_ACCOUNTS = [
  { label: "Super Admin", email: "admin@veritasprime.test", role: "super_admin" },
  { label: "Agent", email: "agent@veritasprime.test", role: "agent" },
  { label: "Finance", email: "finance@veritasprime.test", role: "finance_docs" },
];

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email, password });
      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirectTo = params?.get("redirectTo") || "/admin/dashboard";
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDemoSelect(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("password123");
    setError(null);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-medium text-text-primary">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface-card px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-text-primary">
              Password
            </label>
            <button
              type="button"
              onClick={() => alert("Please contact your workspace administrator to reset your password.")}
              className="text-xs text-secondary hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface-card px-3.5 py-2.5 pr-10 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary focus:outline-none cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-text-muted cursor-pointer select-none">
            Remember this device
          </label>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-error flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] flex-shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full h-11 text-base font-semibold shadow-sm">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      {/* Demo Quick-Fill Bar */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-text-muted mb-2 text-center">
          Quick demo sign-in (1-click autofill):
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => handleDemoSelect(account.email)}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-surface hover:bg-surface-tint border border-border text-text-primary transition-colors cursor-pointer"
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
