"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  isNight: boolean;
}

export default function Hero({ isNight }: HeroProps) {
  const overlayStyle = isNight
    ? "bg-black/[0.15] backdrop-blur-[2px]"
    : "bg-white/[0.15] backdrop-blur-[2px]";

  const ref = useRef<HTMLDivElement | null>(null);

  // Progreso de scroll dentro del Hero (0 = top, 1 = cuando el Hero sale por arriba)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // --- 1. Cruce gradual video → boceto (frame1) ---

  // Video: opacidad 1 → 0.2 en el primer 30% del scroll del hero
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.2]);
  const videoFilter = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["grayscale(0) contrast(1)", "grayscale(1) contrast(1.3)"]
  );

  // Boceto 1: entra pronto y se mantiene un buen rato
  const frame1Opacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.45],
    [0, 1, 1]
  );
  const frame1ClipPath = useTransform(
    scrollYProgress,
    [0.1, 0.25],
    [
      "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  // --- 2. Más fluidez: frames 2–4 con mini-movimiento ---

  // Cada frame entra con su tramo y meseta
  const frame2Opacity = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.7],
    [0, 1, 1]
  );
  const frame3Opacity = useTransform(
    scrollYProgress,
    [0.6, 0.75, 0.9],
    [0, 1, 1]
  );
  const frame4Opacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  // Mini-movimiento (ligero x/scale) para 2, 3 y 4
  const frame2X = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);
  const frame2Scale = useTransform(scrollYProgress, [0.35, 0.5], [1.02, 1]);

  const frame3X = useTransform(scrollYProgress, [0.6, 0.75], [35, 0]);
  const frame3Scale = useTransform(scrollYProgress, [0.6, 0.75], [1.025, 1]);

  const frame4X = useTransform(scrollYProgress, [0.85, 1], [40, 0]);
  const frame4Scale = useTransform(scrollYProgress, [0.85, 1], [1.03, 1]);

  // Rutas correctas según tu estructura /public
  const videoSrc = isNight
    ? "/video/videofusionatnight.mp4" // public/video/videofusionatnight.mp4
    : "/video/videofusionday.mp4";    // public/video/videofusionday.mp4

  const frame1Src = isNight
    ? "/images/frame1atnight.png"
    : "/images/frame1day.png";

  const frame2Src = isNight
    ? "/images/frame2atnight.png"
    : "/images/frame2day.png";

  const frame3Src = isNight
    ? "/images/frame3atnight.png"
    : "/images/frame3day.png";

  const frame4Src = isNight
    ? "/images/frame4atnight.png"
    : "/images/frame4day.png";

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video de fondo con cruce gradual */}
        <motion.video
          key={isNight ? "night" : "day"}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[30%_center]"
          style={{
            opacity: videoOpacity,
            filter: videoFilter,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>

        {/* Frame 1: se revela con máscara diagonal, sensación de "pasar página" */}
        <motion.img
          src={frame1Src}
          alt="Sketch frame 1"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: frame1Opacity,
            clipPath: frame1ClipPath,
          }}
        />

        {/* Frames 2–4: se sustituyen entre sí con pequeños movimientos */}
        <motion.img
          src={frame2Src}
          alt="Sketch frame 2"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: frame2Opacity,
            x: frame2X,
            scale: frame2Scale,
          }}
        />

        <motion.img
          src={frame3Src}
          alt="Sketch frame 3"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: frame3Opacity,
            x: frame3X,
            scale: frame3Scale,
          }}
        />

        <motion.img
          src={frame4Src}
          alt="Sketch frame 4"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: frame4Opacity,
            x: frame4X,
            scale: frame4Scale,
          }}
        />

        {/* Overlay (tu glassmorphism original) */}
        <div className={`absolute inset-0 transition-all duration-500 ${overlayStyle}`} />

        {/* Contenido del Hero */}
        <div className="relative z-10 h-full flex flex-col justify-center pl-[10%] md:pl-[15%]">
          <h1
            className={`text-4xl md:text-6xl font-bold uppercase leading-tight max-w-2xl transition-all duration-500 ${
              isNight
                ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "text-black/90 drop-shadow-sm"
            }`}
          >
            Construction
            <br />
            Expertise in
            <br />
            Los Cabos
          </h1>

          <button
            className={`mt-8 px-8 py-3 backdrop-blur-md border uppercase text-sm tracking-wider transition-all duration-300 w-fit rounded-sm ${
              isNight
                ? "bg-black/30 border-white/10 text-white hover:bg-black/40"
                : "bg-white/30 border-white/40 text-black hover:bg-white/40"
            }`}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
