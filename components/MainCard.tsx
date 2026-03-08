"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────
interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface FlyHeart {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  scale: number;
  rotate: number;
}

const SPARKLE_COLORS = [
  "#ff6b9d",
  "#ff8fab",
  "#c084fc",
  "#f0abfc",
  "#fda4af",
  "#f9a8d4",
  "#e879f9",
  "#fb7185",
];

// ─── Framer Motion variants ────────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3, duration: 0.8, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.6, duration: 0.8 } },
};

const btnVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.9, duration: 0.6, type: "spring", stiffness: 260 },
  },
  hover: { scale: 1.07 },
  tap: { scale: 0.94 },
};

const secondMsgVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.96,
    transition: { duration: 0.4 },
  },
};

const heartFlyVariants = {
  initial: { opacity: 1, scale: 0 },
  animate: (h: FlyHeart) => ({
    opacity: 0,
    scale: h.scale,
    x: h.dx,
    y: h.dy,
    rotate: h.rotate,
    transition: { duration: 1.1, ease: "easeOut" },
  }),
};

// ─── Main Component ────────────────────────────────────────────────────────
export default function MainCard() {
  const [clicked, setClicked] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [flyHearts, setFlyHearts] = useState<FlyHeart[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);

  const handleClick = useCallback(() => {
    if (clicked) return;
    setClicked(true);

    // ── Sparkles ──
    const newSparkles: Sparkle[] = Array.from({ length: 22 }, () => ({
      id: nextId.current++,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 4,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 1100);

    // ── Flying hearts ──
    const newHearts: FlyHeart[] = Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const dist = 90 + Math.random() * 80;
      return {
        id: nextId.current++,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50 + (Math.random() - 0.5) * 20,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 30,
        scale: 0.8 + Math.random() * 0.9,
        rotate: (Math.random() - 0.5) * 60,
      };
    });
    setFlyHearts(newHearts);
    setTimeout(() => setFlyHearts([]), 1300);
  }, [clicked]);

  return (
    <motion.div
      className="relative w-full max-w-lg mx-auto"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Outer glow ring ── */}
      <div
        className="absolute -inset-1 rounded-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(244,114,182,0.35), rgba(192,132,252,0.35))",
          filter: "blur(14px)",
          zIndex: -1,
        }}
      />

      {/* ── Glass card ── */}
      <div className="glass-card rounded-3xl px-7 py-8 sm:px-10 sm:py-10 flex flex-col items-center gap-5 text-center relative overflow-hidden">
        {/* ── Decorative circles ── */}
        <div
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(244,114,182,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 70%)",
          }}
        />

        {/* ── Title ── */}
        <motion.div variants={titleVariants} initial="hidden" animate="visible">
          <h1 className="font-serif gradient-text text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            С 8 марта,
            <br />
            моя Любимая,
            <br />
            Кристина&nbsp;❤️
          </h1>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div
          className="w-20 h-0.5 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, #f472b6, #c084fc, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />

        {/* ── Main poem ── */}
        <motion.div
          className="text-pink-700/80 font-sans text-sm sm:text-base leading-relaxed max-w-xs sm:max-w-sm"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <p>
            Пусть эта весна принесёт тебе&nbsp;много радости, тепла и
            нежных&nbsp;улыбок.
          </p>
          <p className="mt-2">
            Ты расцветаешь, словно сакура&nbsp;—&nbsp;
            <br className="hidden sm:block" />
            легко, красиво и неповторимо.
          </p>
        </motion.div>

        {/* ── Button ── */}
        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.button
              key="btn"
              ref={btnRef}
              className="btn-glow relative mt-1 px-8 py-3 rounded-full font-sans font-semibold text-white text-base sm:text-lg cursor-pointer select-none"
              style={{
                background: "linear-gradient(135deg, #f472b6 0%, #c084fc 100%)",
              }}
              variants={btnVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={handleClick}
            >
              Нажми ❤️
              {/* pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: "2px solid rgba(244,114,182,0.6)" }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.button>
          ) : (
            <motion.span
              key="clicked-icon"
              className="text-3xl mt-1"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
            >
              💖
            </motion.span>
          )}
        </AnimatePresence>

        {/* ── Second message ── */}
        <AnimatePresence>
          {clicked && (
            <motion.div
              key="second-msg"
              className="w-full"
              variants={secondMsgVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div
                className="rounded-2xl px-5 py-4 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(244,114,182,0.15), rgba(192,132,252,0.15))",
                  border: "1px solid rgba(244,114,182,0.3)",
                }}
              >
                <p className="font-serif text-base sm:text-lg text-pink-700 leading-relaxed">
                  ✨ Ты особенная — и это не просто слова.
                </p>
                <p className="font-sans text-sm sm:text-base text-purple-600/80 mt-1 leading-relaxed">
                  Пусть каждый день будет таким же прекрасным, как&nbsp;ты.
                  Люблю тебя&nbsp;💜
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sparkles overlay ── */}
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.div
              key={s.id}
              className="sparkle-dot absolute pointer-events-none"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                background: s.color,
                boxShadow: `0 0 ${s.size * 1.5}px ${s.color}`,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>

        {/* ── Flying hearts ── */}
        <AnimatePresence>
          {flyHearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute pointer-events-none text-lg sm:text-xl select-none"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              custom={h}
              variants={heartFlyVariants}
              initial="initial"
              animate="animate"
            >
              💗
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
