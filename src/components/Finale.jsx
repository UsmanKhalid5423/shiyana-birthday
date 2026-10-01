import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "../content.js";
import { popper, fireworks, vibrate } from "../fx.js";
import Heading from "./Heading.jsx";

export default function Finale({ onReplay }) {
  const [lit, setLit] = useState(false);
  const launch = () => { setLit(true); vibrate([40, 30, 80]); popper(); setTimeout(() => fireworks(5000), 400); setTimeout(() => setLit(false), 7000); };
  return (
    <section className="finale">
      <div className="wrap center">
        <Heading eyebrow="one more thing" title="Light up the sky" sub="Because one celebration is never enough." center />
        <div className="fw-row">
          <motion.button className="btn" onClick={launch} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}><span className="btn-shine" />Launch fireworks 🎆</motion.button>
          <motion.button className="btn ghost" onClick={() => { onReplay(); setTimeout(popper, 1500); }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Back to the top</motion.button>
        </div>
        <AnimatePresence>
          {lit && (
            <motion.div className="finale-big" initial={{ opacity: 0, scale: 0.6, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}>
              Happy Birthday,<br /><span>{content.name}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
