import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Music } from "../music.js";

export default function MusicToggle({ visible }) {
  const [on, setOn] = useState(Music.playing);
  useEffect(() => Music.subscribe(setOn), []);
  return (
    <motion.button className={`music ${on ? "on" : ""}`} aria-label="Toggle music" onClick={() => Music.toggle()}
      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <span className="bars"><i /><i /><i /><i /></span>
    </motion.button>
  );
}
