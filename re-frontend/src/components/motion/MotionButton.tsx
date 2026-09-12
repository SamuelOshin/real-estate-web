"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { transitions } from "@/lib/motion/transitions";
import { forwardRef } from "react";

export interface MotionButtonProps extends HTMLMotionProps<"button"> {
  scaleOnHover?: number;
  scaleOnTap?: number;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className, scaleOnHover = 1.02, scaleOnTap = 0.98, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={shouldReduceMotion ? undefined : { scale: scaleOnHover }}
        whileTap={shouldReduceMotion ? undefined : { scale: scaleOnTap }}
        transition={transitions.snappy}
        className={className}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = "MotionButton";
