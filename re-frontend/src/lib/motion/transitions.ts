import type { Transition } from "framer-motion";

export const transitions = {
  // Natural UI spring for cards, buttons, drawers
  spring: {
    type: "spring",
    stiffness: 320,
    damping: 26,
  } as Transition,

  // Gentle spring for larger components and page elements
  gentle: {
    type: "spring",
    stiffness: 200,
    damping: 24,
  } as Transition,

  // Snappy spring for clicks, taps, active pills
  snappy: {
    type: "spring",
    stiffness: 480,
    damping: 28,
  } as Transition,

  // Smooth ease curve for fades & subtle opacity shifts
  smooth: {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,

  // Quick transition for micro-interactions
  fast: {
    duration: 0.18,
    ease: "easeOut",
  } as Transition,
} as const;

export const motionVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0 },
  },
} as const;
