"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PropertyCard } from "./PropertyCard";
import { transitions } from "@/lib/motion/transitions";
import type { Property } from "@/types/property";

export interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transitions.smooth}
        className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-card p-12 text-center shadow-1"
      >
        <span className="material-symbols-outlined mb-3 text-4xl text-secondary">
          search_off
        </span>
        <h3 className="font-heading text-headline-sm font-bold text-primary">
          No Matching Properties Found
        </h3>
        <p className="mt-2 font-body text-body-md text-text-muted max-w-md">
          Try clearing or adjusting your active filters to see available sovereign-audited plots in our registry.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div layout={!shouldReduceMotion} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            layout={!shouldReduceMotion}
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
            transition={transitions.spring}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
