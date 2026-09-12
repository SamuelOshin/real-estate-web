import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-primary">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <span className="material-symbols-outlined mb-4 text-6xl text-secondary">
          explore_off
        </span>
        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
          Parcel Not Found
        </h1>
        <p className="mt-4 max-w-md text-base text-secondary">
          The cadastral parcel, document, or page you requested could not be located in the Prison Gihon registry.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold text-canvas shadow-button transition hover:bg-opacity-90"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Return to Homepage
          </Link>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-heading text-sm font-bold text-primary shadow-1 transition hover:bg-neutral-light"
          >
            <span className="material-symbols-outlined text-base">domain</span>
            Browse Verified Properties
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
