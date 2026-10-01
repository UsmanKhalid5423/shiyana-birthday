import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "./Heading.jsx";
import Photo from "./Photo.jsx";

/* Pinned section: vertical scrolling drives a horizontal film reel of photos. */
export default function Reel({ photos, onPhoto }) {
  const ref = useRef(null), track = useRef(null);
  const [range, setRange] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const m = () => setRange(Math.max(0, track.current.scrollWidth - innerWidth + 48));
    m(); addEventListener("resize", m); return () => removeEventListener("resize", m);
  }, []);

  return (
    <section className="reel" ref={ref}>
      <div className="reel-sticky">
        <div className="wrap"><Heading eyebrow="chapter one" title="Moments on film" sub="Keep scrolling, the reel moves with you." /></div>
        <motion.div className="reel-track" ref={track} style={{ x }}>
          {photos.map((p, i) => (
            <motion.figure key={i} className="reel-card" initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, scale: 1.02 }} onClick={() => onPhoto(i)}>
              <span className="reel-num">{String(i + 1).padStart(2, "0")}</span>
              <Photo photo={p} index={i} className="reel-img" />
              <figcaption><span>{p.caption}</span><small>{p.date}</small></figcaption>
            </motion.figure>
          ))}
          <div className="reel-end"><span>→</span><p>keep going</p></div>
        </motion.div>
        <div className="reel-bar"><motion.i style={{ width: bar }} /></div>
      </div>
    </section>
  );
}
