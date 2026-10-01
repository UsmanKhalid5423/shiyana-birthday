import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../content.js";
import Photo from "./Photo.jsx";

/* Full-screen viewer. Swipe or use arrow keys to move between photos; tap outside or Esc to close. */
export default function Lightbox({ index, onChange, onClose }) {
  const n = content.photos.length;
  const go = (d) => onChange((index + d + n) % n);
  useEffect(() => {
    const key = (e) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    addEventListener("keydown", key); return () => removeEventListener("keydown", key);
  });
  const p = content.photos[index];
  return (
    <motion.div className="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <button className="lb-x" onClick={onClose} aria-label="Close">✕</button>
      <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">‹</button>
      <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">›</button>
      <AnimatePresence mode="wait">
        <motion.figure key={index} className="lb-fig" onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.6}
          onDragEnd={(_, i) => { if (i.offset.x < -70) go(1); else if (i.offset.x > 70) go(-1); }}>
          <Photo photo={p} index={index} className="lb-img" />
          <figcaption><span>{p.caption}</span><small>{p.date} · {index + 1} / {n}</small></figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}
