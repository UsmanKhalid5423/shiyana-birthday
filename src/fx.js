import confetti from "canvas-confetti";

export const palette = ["#22d3ee", "#8b5cf6", "#f472b6", "#fbbf24", "#ffffff"];

export function popper() {
  const base = { spread: 70, ticks: 240, gravity: 0.9, scalar: 1.1, colors: palette, zIndex: 200 };
  confetti({ ...base, particleCount: 140, origin: { x: 0, y: 0.9 }, angle: 60 });
  confetti({ ...base, particleCount: 140, origin: { x: 1, y: 0.9 }, angle: 120 });
  setTimeout(() => confetti({ ...base, particleCount: 220, spread: 130, startVelocity: 48, origin: { x: 0.5, y: 0.4 } }), 220);
  setTimeout(() => confetti({ ...base, particleCount: 70, shapes: ["star"], scalar: 1.7, origin: { x: 0.5, y: 0.3 }, spread: 100 }), 480);
}

export function fireworks(duration = 4500) {
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.8 }, colors: palette, zIndex: 200 });
    confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.8 }, colors: palette, zIndex: 200 });
    if (Math.random() < 0.09)
      confetti({ particleCount: 100, spread: 360, startVelocity: 38, ticks: 130, origin: { x: 0.2 + Math.random() * 0.6, y: 0.2 + Math.random() * 0.4 }, colors: palette, zIndex: 200 });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function sparkle(x, y) {
  confetti({ particleCount: 18, spread: 80, startVelocity: 18, ticks: 60, scalar: 0.7, origin: { x, y }, colors: palette, zIndex: 200 });
}

export const vibrate = (p) => navigator.vibrate && navigator.vibrate(p);
