import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { content } from "./content.js";
import Gate from "./components/Gate.jsx";
import Stars from "./components/Stars.jsx";
import Cursor from "./components/Cursor.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Reel from "./components/Reel.jsx";
import PolaroidWall from "./components/PolaroidWall.jsx";
import Stack from "./components/Stack.jsx";
import Letter from "./components/Letter.jsx";
import Reasons from "./components/Reasons.jsx";
import Timeline from "./components/Timeline.jsx";
import Cake from "./components/Cake.jsx";
import Finale from "./components/Finale.jsx";
import Lightbox from "./components/Lightbox.jsx";
import MusicToggle from "./components/MusicToggle.jsx";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    let raf;
    const tick = (t) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    lenis.stop();
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const l = lenisRef.current; if (!l) return;
    if (opened && lightbox === null) l.start(); else l.stop();
    document.body.classList.toggle("locked", !opened || lightbox !== null);
  }, [opened, lightbox]);

  const scrollTop = () => lenisRef.current?.scrollTo(0, { duration: 1.6 });

  return (
    <>
      <Stars />
      <div className="aurora"><span /><span /><span /></div>
      <div className="grain" />
      <Cursor />

      <AnimatePresence>{!opened && <Gate key="gate" onOpen={() => setOpened(true)} />}</AnimatePresence>

      <main className={opened ? "in" : ""}>
        <Hero opened={opened} photos={content.photos.slice(0, 5)} onPhoto={setLightbox} />
        <Marquee text={`Happy Birthday ${content.name}`} />
        <Reel photos={content.photos.slice(0, 6)} onPhoto={setLightbox} />
        <Letter />
        <PolaroidWall photos={content.photos.slice(6, 12)} offset={6} onPhoto={setLightbox} />
        <Reasons />
        <Stack photos={content.photos.slice(0, 4)} onPhoto={setLightbox} />
        <Timeline onPhoto={setLightbox} />
        <Cake />
        <Finale onReplay={scrollTop} />
        <footer className="footer">
          made with <span className="heart">♥</span> by <b>{content.from}</b> · {new Date().getFullYear()}
        </footer>
      </main>

      <MusicToggle visible={opened} />
      <AnimatePresence>
        {lightbox !== null && <Lightbox key="lb" index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </>
  );
}
