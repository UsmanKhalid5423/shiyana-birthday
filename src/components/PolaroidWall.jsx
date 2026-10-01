import React, { useRef } from "react";
import { motion } from "framer-motion";
import Heading from "./Heading.jsx";
import Photo from "./Photo.jsx";

const spots = [
  { x: "4%", y: "6%", r: -9 }, { x: "36%", y: "0%", r: 6 }, { x: "66%", y: "8%", r: -4 },
  { x: "12%", y: "50%", r: 7 }, { x: "44%", y: "46%", r: -7 }, { x: "72%", y: "54%", r: 5 },
];

/* Polaroids pinned to a wall. On desktop you can drag them around; on phones they fan into a grid. */
export default function PolaroidWall({ photos, offset, onPhoto }) {
  const wall = useRef(null);
  const fine = typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <section className="wall-sec">
      <div className="wrap">
        <Heading eyebrow="chapter two" title="Pinned to the wall" sub={fine ? "Grab one. Move it. Tap to open." : "Tap any photo to open it."} />
        <div className={`wall ${fine ? "drag" : "grid"}`} ref={wall}>
          {photos.map((p, i) => (
            <motion.div key={i} className="polaroid" style={fine ? { left: spots[i].x, top: spots[i].y } : undefined}
              initial={{ opacity: 0, y: 80, rotate: spots[i].r * 3, scale: 0.8 }} whileInView={{ opacity: 1, y: 0, rotate: spots[i].r, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.08, duration: 0.9, type: "spring", stiffness: 120, damping: 16 }}
              drag={fine} dragConstraints={wall} dragElastic={0.12} dragMomentum
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 20, boxShadow: "0 50px 90px -30px rgba(0,0,0,.9)" }}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}>
              <span className="pin" />
              <div className="polaroid-img" onClick={() => onPhoto(offset + i)}><Photo photo={p} index={offset + i} /></div>
              <p className="polaroid-cap">{p.caption}</p>
              <small>{p.date}</small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
