"use client";

import { motion, useReducedMotion } from "framer-motion";
import { transitions } from "@/lib/motion/transitions";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...transitions.smooth,
        duration: shouldReduceMotion ? 0 : 0.25,
      }}
    >
      {children}
    </motion.div>
  );
}
