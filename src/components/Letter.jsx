import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "../content.js";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return <><motion.span className="lw" style={{ opacity, y }}>{children}</motion.span>{" "}</>;
}

/* The letter brightens word by word as you scroll through it. */
export default function Letter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const all = content.letter.map((p) => p.split(" "));
  const total = all.reduce((n, w) => n + w.length, 0);
  let k = 0;

  return (
    <section className="letter-sec">
      <div className="wrap">
        <motion.div className="letter" ref={ref} initial={{ opacity: 0, y: 60, rotateX: 12 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow">a note from me</p>
          <h2 className="letter-title">{content.letterTitle}</h2>
          {all.map((words, pi) => (
            <p key={pi} className="letter-p">
              {words.map((w, wi) => { const s = k / total; k++; return <Word key={wi} progress={scrollYProgress} range={[s, Math.min(1, s + 1 / total + 0.04)]}>{w}</Word>; })}
            </p>
          ))}
          <div className="sign">with all my love,<b>{content.from}</b></div>
        </motion.div>
      </div>
    </section>
  );
}
