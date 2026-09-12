"use client";

import { motion, useReducedMotion } from "framer-motion";
import { transitions } from "@/lib/motion/transitions";

interface MotionCardProps {
  children: React.ReactNode;
  className?: string;
  hoverY?: number;
  tapScale?: number;
}

export function MotionCard({
  children,
  className,
  hoverY = -4,
  tapScale = 0.99,
}: MotionCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={shouldReduceMotion ? undefined : { y: hoverY }}
      whileTap={shouldReduceMotion ? undefined : { scale: tapScale }}
      transition={transitions.spring}
      className={className}
    >
      {children}
    </motion.div>
  );
}
