import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-400), y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20 }), sy = useSpring(y, { stiffness: 120, damping: 20 });
  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);
  return <motion.div className="cursor" style={{ x: sx, y: sy }} />;
}
