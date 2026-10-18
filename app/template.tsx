"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.div initial={{opacity:0, y:reduce ? 0 : 8}} animate={{opacity:1,y:0}} transition={{duration:.35,ease:"easeOut"}}>{children}</motion.div>;
}
