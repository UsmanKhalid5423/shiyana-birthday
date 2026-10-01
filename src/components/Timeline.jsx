import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { content } from "../content.js";
import Heading from "./Heading.jsx";
import Photo from "./Photo.jsx";

/* A vertical timeline whose spine draws itself as you scroll. */
export default function Timeline({ onPhoto }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <section className="tl-sec">
      <div className="wrap">
        <Heading eyebrow="chapter four" title="Through the years" sub="A very short history of a very big deal." center />
        <div className="tl" ref={ref}>
          <div className="tl-line"><motion.i style={{ scaleY }} /></div>
          {content.timeline.map((t, i) => {
            const photo = content.photos[t.photo];
            return (
              <motion.div key={i} className={`tl-item ${i % 2 ? "right" : "left"}`} initial={{ opacity: 0, x: i % 2 ? 60 : -60 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                <motion.span className="tl-dot" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.3 }} />
                <div className="tl-card">
                  <motion.div className="tl-img" whileHover={{ scale: 1.03, rotate: i % 2 ? 1.5 : -1.5 }} onClick={() => onPhoto(t.photo)}><Photo photo={photo} index={t.photo} /></motion.div>
                  <span className="tl-year">{t.year}</span>
                  <h3>{t.title}</h3><p>{t.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
