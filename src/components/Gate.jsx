import React, { useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content.js";
import { popper, vibrate } from "../fx.js";
import { Music } from "../music.js";

const letters = (s) => s.split("").map((c, i) => (
  <motion.span key={i} className="ch" variants={{ hidden: { y: "110%", opacity: 0, rotate: 8 }, show: { y: 0, opacity: 1, rotate: 0 } }}
    transition={{ type: "spring", stiffness: 260, damping: 22 }}>
    {c === " " ? " " : c}
  </motion.span>
));

export default function Gate({ onOpen }) {
  const [busy, setBusy] = useState(false);
  const open = () => {
    if (busy) return;
    setBusy(true);
    Music.start();
    popper();
    vibrate([30, 40, 60]);
    setTimeout(onOpen, 650);
  };

  return (
    <motion.div className="gate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(24px)", scale: 1.15, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}>
      <motion.div className="gate-orb" animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div className="gate-card" initial={{ y: 60, opacity: 0, scale: 0.92 }} animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <motion.span className="gift" animate={busy ? { scale: [1, 1.6, 0], rotate: [0, -20, 40] } : { rotate: [-7, 7, -7], y: [0, -10, 0] }}
          transition={busy ? { duration: 0.6 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>🎁</motion.span>

        <div className="badge"><i /> a surprise is waiting</div>

        <motion.h1 className="gate-title" initial="hidden" animate="show" transition={{ staggerChildren: 0.045, delayChildren: 0.6 }}>
          <span className="clip">{letters(`Hey ${content.name}`)}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
          Someone built you an album. Every page moves. Sound on is recommended.
        </motion.p>

        <motion.button className="btn" onClick={open} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <span className="btn-shine" />
          Open the album ✨
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
