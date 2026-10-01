import React, { useEffect, useRef } from "react";

export default function Stars() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, stars = [], mx = 0, my = 0, raf, t = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => {
      w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(240, Math.floor((w * h) / 5500));
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2, r: Math.random() * 1.4 + 0.3, p: Math.random() * Math.PI * 2 }));
    };
    const move = (e) => { mx = e.clientX / w - 0.5; my = e.clientY / h - 0.5; };
    const draw = () => {
      t += 0.01; ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y -= s.z * 0.14; if (s.y < -5) { s.y = h + 5; s.x = Math.random() * w; }
        const a = 0.35 + Math.sin(t * 2 + s.p) * 0.3;
        ctx.beginPath(); ctx.arc(s.x + mx * 40 * s.z, s.y + my * 40 * s.z, s.r * s.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.p % 2 < 1 ? "190,230,255" : "255,210,240"},${a})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    addEventListener("resize", resize); addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas id="stars" ref={ref} />;
}
