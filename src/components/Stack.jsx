import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Heading from "./Heading.jsx";
import Photo from "./Photo.jsx";

function Card({ photo, index, n, progress, onPhoto }) {
  const start = index / n, end = 1;
  const scale = useTransform(progress, [start, end], [1, 1 - (n - index) * 0.045]);
  const bright = useTransform(progress, [start, end], [1, 0.55]);
  const filter = useTransform(bright, (b) => `brightness(${b})`);
  const side = index % 2 === 0;
  return (
    <div className="stack-item">
      <motion.article className={`stack-card ${side ? "" : "flip"}`} style={{ scale, filter, top: `calc(9vh + ${index * 18}px)` }}>
        <div className="stack-img" onClick={() => onPhoto(index)}><Photo photo={photo} index={index} /></div>
        <div className="stack-text">
          <span className="stack-num">memory {String(index + 1).padStart(2, "0")}</span>
          <h3>{photo.caption}</h3>
          <p>{photo.date}</p>
        </div>
      </motion.article>
    </div>
  );
}

/* Cards that stack on top of each other as you scroll. */
export default function Stack({ photos, onPhoto }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section className="stack-sec">
      <div className="wrap"><Heading eyebrow="chapter three" title="Stacked memories" sub="Each one lands on the last." /></div>
      <div className="stack" ref={ref}>
        {photos.map((p, i) => <Card key={i} photo={p} index={i} n={photos.length} progress={scrollYProgress} onPhoto={onPhoto} />)}
      </div>
    </section>
  );
}
