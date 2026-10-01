import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { content } from "../content.js";
import Photo from "./Photo.jsx";

const spots = [
  { x: "6%", y: "14%", r: -12, w: "clamp(110px, 16vw, 230px)", d: 1.6 },
  { x: "74%", y: "10%", r: 9, w: "clamp(120px, 17vw, 250px)", d: 1.1 },
  { x: "2%", y: "62%", r: 7, w: "clamp(100px, 14vw, 200px)", d: 0.8 },
  { x: "78%", y: "60%", r: -8, w: "clamp(120px, 18vw, 260px)", d: 1.4 },
  { x: "42%", y: "76%", r: 4, w: "clamp(90px, 12vw, 170px)", d: 0.6 },
];

function Floating({ photo, index, spot, mx, my, delay, onPhoto }) {
  const x = useTransform(mx, (v) => v * 60 * spot.d);
  const y = useTransform(my, (v) => v * 60 * spot.d);
  return (
    <motion.div className="hero-photo" style={{ left: spot.x, top: spot.y, width: spot.w, x, y }}
      initial={{ opacity: 0, scale: 0.6, rotate: spot.r - 20, y: 80 }}
      animate={{ opacity: 1, scale: 1, rotate: spot.r, y: 0 }}
      transition={{ delay, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}>
      <motion.div className="hero-photo-inner" animate={{ y: [0, -14, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        whileHover={{ scale: 1.08, rotate: 0, zIndex: 5 }} onClick={() => onPhoto(index)}>
        <Photo photo={photo} index={index} />
      </motion.div>
    </motion.div>
  );
}

const Letters = ({ text, delay = 0, className = "" }) => (
  <motion.span className={`clip ${className}`} initial="hidden" animate="show" transition={{ staggerChildren: 0.05, delayChildren: delay }}>
    {text.split("").map((c, i) => (
      <motion.span key={i} className="ch" variants={{ hidden: { y: "115%", opacity: 0, rotate: 10 }, show: { y: 0, opacity: 1, rotate: 0 } }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}>{c === " " ? " " : c}</motion.span>
    ))}
  </motion.span>
);

export default function Hero({ opened, photos, onPhoto }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 }), sy = useSpring(my, { stiffness: 60, damping: 20 });
  useEffect(() => {
    const move = (e) => { mx.set(e.clientX / innerWidth - 0.5); my.set(e.clientY / innerHeight - 0.5); };
    const tilt = (e) => { if (e.gamma == null) return; mx.set(Math.max(-0.5, Math.min(0.5, e.gamma / 60))); my.set(Math.max(-0.5, Math.min(0.5, (e.beta - 45) / 60))); };
    addEventListener("pointermove", move, { passive: true });
    addEventListener("deviceorientation", tilt);
    return () => { removeEventListener("pointermove", move); removeEventListener("deviceorientation", tilt); };
  }, []);

  if (!opened) return <section className="hero" />;

  return (
    <section className="hero">
      {photos.map((p, i) => <Floating key={i} photo={p} index={i} spot={spots[i]} mx={sx} my={sy} delay={0.4 + i * 0.12} onPhoto={onPhoto} />)}

      <div className="hero-center">
        <motion.p className="eyebrow center" initial={{ opacity: 0, letterSpacing: "1em" }} animate={{ opacity: 1, letterSpacing: ".3em" }} transition={{ delay: 0.3, duration: 1.2 }}>
          it's your day
        </motion.p>
        <h1 className="title">
          <span className="l1"><Letters text="Happy Birthday" delay={0.5} /></span>
          <span className="l2"><Letters text={content.name} delay={1.1} /></span>
        </h1>
        <motion.p className="sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}>
          {content.tagline} <br />Scroll. Every page of this album moves.
        </motion.p>
      </div>

      <motion.div className="ring" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
        <svg viewBox="0 0 200 200"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <text><textPath href="#circ">✦ HAPPY BIRTHDAY ✦ {content.name.toUpperCase()} ✦ HAPPY BIRTHDAY ✦ {content.name.toUpperCase()} </textPath></text>
        </svg>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}>
        <i />scroll
      </motion.div>
    </section>
  );
}
