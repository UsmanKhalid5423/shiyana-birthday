/* "Happy Birthday" synthesised with WebAudio, so no audio files are needed. */
const N = { G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99 };
const tune = [
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["C5", 1], ["B4", 2],
  ["G4", 0.75], ["G4", 0.25], ["A4", 1], ["G4", 1], ["D5", 1], ["C5", 2],
  ["G4", 0.75], ["G4", 0.25], ["G5", 1], ["E5", 1], ["C5", 1], ["B4", 1], ["A4", 2],
  ["F5", 0.75], ["F5", 0.25], ["E5", 1], ["C5", 1], ["D5", 1], ["C5", 3],
];
const beat = 60 / 100;

let ctx, gain, timer, playing = false;
const listeners = new Set();
const emit = () => listeners.forEach((l) => l(playing));

function note(f, t0, d) {
  for (const [mult, vol, type] of [[1, 0.2, "triangle"], [2, 0.05, "sine"], [0.5, 0.06, "sine"]]) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f * mult;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d * 0.95);
    o.connect(g); g.connect(gain); o.start(t0); o.stop(t0 + d);
  }
}
function loop() {
  let t = ctx.currentTime + 0.1;
  for (const [n, b] of tune) { note(N[n], t, b * beat); t += b * beat; }
  timer = setTimeout(loop, (t - ctx.currentTime + 1.5) * 1000);
}

export const Music = {
  start() {
    if (playing) return;
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    if (!gain) { gain = ctx.createGain(); gain.gain.value = 0.9; gain.connect(ctx.destination); }
    ctx.resume(); playing = true; loop(); emit();
  },
  stop() { playing = false; clearTimeout(timer); ctx && ctx.suspend(); emit(); },
  toggle() { playing ? Music.stop() : Music.start(); },
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  get playing() { return playing; },
};
