import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
        <Link
          href="/"
          className="flex items-center gap-2 text-text-muted hover:text-text-primary font-body text-body-sm transition-colors group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          <span>Back to website</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[420px] mx-auto my-8">
        {/* Brand Logo */}
        <div className="mb-6 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2.5 group focus:outline-none">
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-primary/5 rounded-xl p-2 group-hover:scale-105 transition-transform border border-primary/10">
              <Image
                src="/logo-icon.svg"
                alt={siteConfig.name}
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-heading font-extrabold text-headline-sm text-primary tracking-tight">
              {siteConfig.logo.text}
            </span>
          </Link>
        </div>

        {children}
      </div>

      {/* Footer */}
      <div className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted border-t border-border/60 pt-4">
        <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-text-primary transition-colors">
            Contact &amp; Support
          </Link>
        </div>
      </div>
    </div>
  );
}
