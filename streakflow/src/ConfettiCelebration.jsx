import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PUBLIC_INTERFACE
 * ConfettiCelebration overlays a colorful animated confetti burst
 * on the page, then fades out. Automatically disappears after a few seconds.
 * Uses Framer Motion for fade/entrance/exit. Non-blocking, no modal.
 *
 * Props:
 * - show: boolean, triggers confetti display when true
 * - duration: ms (default 2600), how long to show confetti
 */
function randomInt(a, b) {
  return a + Math.floor(Math.random() * (b - a + 1));
}
function randomColor() {
  // Pastel colors (match theme)
  const palette = [
    "#A8D5BA", "#A3D5FF", "#F4C2C2", "#F7E9E4", "#E4ECF7",
    "#bcbee6", "#fbad26", "#61c471", "#b1e5c0", "#b57bee",
  ];
  return palette[randomInt(0, palette.length - 1)];
}

function generateConfetti(count = 60) {
  // Returns array of confetti pieces with randomized start/end positions/angles/colors
  const pieces = [];
  for (let i = 0; i < count; ++i) {
    const angle = Math.random() * 2 * Math.PI;
    pieces.push({
      id: i,
      x: randomInt(15, 85) + Math.sin(angle) * randomInt(-20, 20),
      y: randomInt(7, 30),
      size: randomInt(13, 28),
      color: randomColor(),
      rotate: randomInt(0, 360),
      endY: randomInt(92, 99) + Math.sin(angle) * randomInt(0, 6),
      endX: randomInt(8, 92) + Math.sin(angle) * randomInt(-13, 13),
      fallDuration: randomInt(1300, 1850),
      rotDuration: randomInt(1200, 1700),
    });
  }
  return pieces;
}

function ConfettiCelebration({ show, duration = 2600 }) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef(null);
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    if (show) {
      setActive(true);
      setSeed(Math.random());
      timeoutRef.current = setTimeout(() => setActive(false), duration);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [show, duration]);

  // Re-generate particles on show or seed change for freshness
  const confetti = active ? generateConfetti(56) : [];

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="confetti-celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.76 } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            pointerEvents: "none",
            overflow: "hidden",
            width: "100vw",
            height: "100vh",
          }}
          aria-live="polite"
        >
          {confetti.map(p => (
            <motion.div
              key={p.id + seed}
              initial={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: 1,
                rotate: p.rotate,
                scale: 1.08,
              }}
              animate={{
                left: `${p.endX}%`,
                top: `${p.endY}%`,
                opacity: [1, 1, 0.47, 0],
                rotate: p.rotate + randomInt(70, 330),
                scale: [1.08, 1.08, 0.93],
                transition: {
                  y: { duration: p.fallDuration / 1000, ease: "easeOut" },
                  left: { duration: p.fallDuration / 1000, ease: "easeOut" },
                  top: { duration: p.fallDuration / 1000, ease: "easeIn" },
                  opacity: { duration: duration / 1000, ease: "linear" },
                  rotate: { duration: p.rotDuration / 1000, ease: "easeInOut" },
                  scale: { duration: duration / 1300, ease: "easeIn" },
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.31 },
              }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size * 0.33,
                background: p.color,
                borderRadius: "45%",
                boxShadow: "0 0 7px 1px rgba(120,120,132,0.109)",
                willChange: "transform, opacity",
                filter: "brightness(1.1) blur(0.2px)",
              }}
              aria-hidden="true"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfettiCelebration;
