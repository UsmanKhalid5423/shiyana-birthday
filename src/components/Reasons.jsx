import React from "react";
import { motion } from "framer-motion";
import { content } from "../content.js";
import Heading from "./Heading.jsx";

function Card({ r, i }) {
  const move = (e) => {
    const el = e.currentTarget, b = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - b.left}px`); el.style.setProperty("--my", `${e.clientY - b.top}px`);
    if (e.pointerType === "mouse") el.style.transform = `rotateX(${((e.clientY - b.top) / b.height - 0.5) * -12}deg) rotateY(${((e.clientX - b.left) / b.width - 0.5) * 12}deg) translateY(-6px)`;
  };
  return (
    <motion.div className="card" onPointerMove={move} onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
      initial={{ opacity: 0, y: 50, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
      <span className="n">0{i + 1}</span>
      <motion.span className="ic" whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }} transition={{ duration: 0.5 }}>{r.icon}</motion.span>
      <h3>{r.title}</h3><p>{r.text}</p>
    </motion.div>
  );
}

export default function Reasons() {
  return (
    <section>
      <div className="wrap">
        <Heading eyebrow="for the record" title="A few reasons you're impossible to replace" sub="Not an exhaustive list. The full version wouldn't fit on the internet." />
        <div className="grid">{content.reasons.map((r, i) => <Card key={i} r={r} i={i} />)}</div>
      </div>
    </section>
  );
}
