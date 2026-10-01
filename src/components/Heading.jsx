import React from "react";
import { motion } from "framer-motion";

/* Section heading: eyebrow + title whose words rise in from a clipped box when scrolled into view. */
export default function Heading({ eyebrow, title, sub, center }) {
  const words = title.split(" ");
  return (
    <motion.div className={`sec-head ${center ? "center" : ""}`} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.07 }}>
      <motion.p className="eyebrow" variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>{eyebrow}</motion.p>
      <h2 className="sec-title">
        {words.map((w, i) => (
          <span className="clip hw" key={i}>
            <motion.span className="w" variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: 0, rotate: 0 } }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
          </span>
        ))}
      </h2>
      {sub && <motion.p className="sec-sub" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.8 }}>{sub}</motion.p>}
    </motion.div>
  );
}
