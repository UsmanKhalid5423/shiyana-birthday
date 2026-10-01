import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { content } from "../content.js";
import { popper, fireworks, vibrate } from "../fx.js";
import Heading from "./Heading.jsx";

const colors = ["#22d3ee", "#8b5cf6", "#f472b6", "#fbbf24"];

export default function Cake() {
  const n = content.candles;
  const [out, setOut] = useState(() => Array(n).fill(false));
  const lit = out.filter((o) => !o).length;
  const done = lit === 0;
  const sprinkles = useMemo(() => [
    ...Array.from({ length: 26 }, () => ({ x: 70 + Math.random() * 280, y: 240 + Math.random() * 44, r: Math.random() * 180, c: colors[Math.floor(Math.random() * 4)] })),
    ...Array.from({ length: 14 }, () => ({ x: 115 + Math.random() * 190, y: 185 + Math.random() * 34, r: Math.random() * 180, c: colors[Math.floor(Math.random() * 4)] })),
  ], []);

  const blow = (i) => {
    if (out[i]) return;
    const next = out.slice(); next[i] = true; setOut(next);
    vibrate(20);
    if (next.every(Boolean)) { popper(); setTimeout(() => fireworks(3500), 700); }
  };
  const msg = done ? `Wish granted, ${content.name}. ✦` : lit === 1 ? "Last one. Close your eyes." : lit === 2 ? "Almost there… think about your wish." : "Tap each flame to blow it out.";
  const W = 420, spacing = 44, startX = (W - (n - 1) * spacing) / 2;

  return (
    <section className="cake-sec">
      <div className="wrap cake-wrap">
        <Heading eyebrow="make a wish" title="Blow out the candles" sub="Close your eyes on the last one." center />
        <motion.div className="cake-stage" initial={{ opacity: 0, y: 80, scale: 0.85 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, type: "spring", stiffness: 90, damping: 16 }}>
          <svg viewBox={`0 0 ${W} 330`} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="candle" x1="0" x2="1"><stop offset="0" stopColor="#e9ecff" /><stop offset="1" stopColor="#b7bde8" /></linearGradient>
              <pattern id="stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="8" fill="#8b5cf6" /></pattern>
              <radialGradient id="flame" cx=".5" cy=".7" r=".6"><stop offset="0" stopColor="#fff2a8" /><stop offset=".5" stopColor="#ffb347" /><stop offset="1" stopColor="#ff5e7e" /></radialGradient>
              <radialGradient id="glow"><stop offset="0" stopColor="#ffb347" stopOpacity=".45" /><stop offset="1" stopColor="#ffb347" stopOpacity="0" /></radialGradient>
              <linearGradient id="tier1" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#f9a8d4" /><stop offset="1" stopColor="#c084fc" /></linearGradient>
              <linearGradient id="tier2" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#a5f3fc" /><stop offset="1" stopColor="#818cf8" /></linearGradient>
              <linearGradient id="plate" x1="0" x2="1"><stop offset="0" stopColor="#2b2f55" /><stop offset=".5" stopColor="#4c518a" /><stop offset="1" stopColor="#2b2f55" /></linearGradient>
              <linearGradient id="icing" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e7e9ff" /></linearGradient>
            </defs>
            <ellipse cx="210" cy="300" rx="190" ry="20" fill="url(#plate)" opacity=".9" />
            <ellipse cx="210" cy="296" rx="170" ry="14" fill="#1a1d3a" />
            <rect x="60" y="222" width="300" height="70" rx="14" fill="url(#tier2)" />
            <ellipse cx="210" cy="222" rx="150" ry="16" fill="#c7f5ff" />
            <path d="M60 236 q 20 26 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 20 0 v -14 H60 Z" fill="url(#icing)" />
            <rect x="105" y="164" width="210" height="62" rx="12" fill="url(#tier1)" />
            <ellipse cx="210" cy="164" rx="105" ry="13" fill="#fde2f3" />
            <path d="M105 176 q 15 22 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 t 30 0 v -12 H105 Z" fill="url(#icing)" />
            {sprinkles.map((s, i) => <rect key={i} x={s.x} y={s.y} width="6" height="2.5" rx="1" fill={s.c} transform={`rotate(${s.r} ${s.x} ${s.y})`} />)}
            {out.map((isOut, i) => (
              <g key={i} className="candle" transform={`translate(${startX + i * spacing},0)`} onClick={() => blow(i)} tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && blow(i)}>
                <rect x="-5" y="118" width="10" height="46" rx="3" fill="url(#candle)" />
                <rect x="-5" y="118" width="10" height="46" rx="3" fill="url(#stripes)" opacity=".35" />
                <line x1="0" y1="118" x2="0" y2="110" stroke="#2a2a3a" strokeWidth="2" />
                <ellipse className={`glow ${isOut ? "off" : ""}`} cx="0" cy="100" rx="22" ry="26" fill="url(#glow)" />
                <g className={`flame ${isOut ? "off" : ""}`} style={{ animationDelay: `${-i * 0.13}s` }}>
                  <path d="M0 84 C 8 96, 8 104, 0 110 C -8 104, -8 96, 0 84 Z" fill="url(#flame)" />
                  <path d="M0 94 C 4 100, 4 104, 0 108 C -4 104, -4 100, 0 94 Z" fill="#fff8d6" opacity=".9" />
                </g>
                <g className={`smoke ${isOut ? "go" : ""}`}>
                  <circle cx="-3" cy="100" r="4" fill="#cfd3ff" opacity=".7" /><circle cx="3" cy="92" r="5" fill="#cfd3ff" opacity=".5" /><circle cx="-1" cy="84" r="6" fill="#cfd3ff" opacity=".3" />
                </g>
                <rect x="-18" y="74" width="36" height="92" fill="transparent" />
              </g>
            ))}
          </svg>
        </motion.div>
        <motion.p key={msg} className={`cake-msg ${done ? "done" : ""}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>{msg}</motion.p>
        <span className="counter">{done ? "it's already on its way" : `${lit} of ${n} still burning`}</span>
      </div>
    </section>
  );
}
