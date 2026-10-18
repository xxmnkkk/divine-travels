"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div initial={reduce ? false : {opacity:.98, y:6}} animate={{opacity:1,y:0}} transition={{duration:reduce ? 0 : .35,ease:"easeOut"}}>{children}</motion.div>;
}
