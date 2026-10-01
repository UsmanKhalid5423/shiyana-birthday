import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Marquee({ text }) {
  const { scrollY } = useScroll();
  const v = useSpring(useTransform(scrollY, [0, 1200], [0, -400]), { stiffness: 60, damping: 20 });
  const items = Array.from({ length: 8 }, (_, i) => <span key={i}>{text} <em>✦</em></span>);
  return (
    <div className="marquee-wrap">
      <div className="marquee"><motion.div className="marquee-track" style={{ x: v }}>{items}{items}</motion.div></div>
      <div className="marquee rev"><motion.div className="marquee-track" style={{ x: useTransform(v, (x) => -x - 800) }}>{items}{items}</motion.div></div>
    </div>
  );
}
