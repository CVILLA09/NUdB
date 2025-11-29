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

  // Frame 2: máscara diagonal en su tramo de entrada
  const frame2ClipPath = useTransform(
    scrollYProgress,
    [0.3, 0.45],
    [
      "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  // Frame 3
  const frame3ClipPath = useTransform(
    scrollYProgress,
    [0.55, 0.72],
    [
      "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  // Frame 4
  const frame4ClipPath = useTransform(
    scrollYProgress,
    [0.82, 0.95],
    [
      "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ]
  );

  // --- 2. Más fluidez: frames 2–4 con mini-movimiento ---

  // Cada frame tiene entrada corta + meseta larga
  const frame2Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.45, 0.6],
    [0, 1, 1]
  );

  const frame3Opacity = useTransform(
    scrollYProgress,
    [0.55, 0.72, 0.87],
    [0, 1, 1]
  );

  const frame4Opacity = useTransform(
    scrollYProgress,
    [0.82, 1],
    [0, 1]
  );

  // Mini-movimiento (ligero x/scale) para 2, 3 y 4
  const frame2X = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);
  const frame2Scale = useTransform(scrollYProgress, [0.35, 0.5], [1.02, 1]);

  const frame3X = useTransform(scrollYProgress, [0.6, 0.75], [35, 0]);
  const frame3Scale = useTransform(scrollYProgress, [0.6, 0.75], [1.025, 1]);

  const frame4X = useTransform(scrollYProgress, [0.85, 1], [40, 0]);
  const frame4Scale = useTransform(scrollYProgress, [0.85, 1], [1.03, 1]);

  // --- Contenidos sincronizados con los frames ---

  // Hero title (va con video + frame1)
  const heroTitleOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.4],
    [1, 1, 0]
  );
  const heroTitleY = useTransform(scrollYProgress, [0, 0.4], [210, 40]);

  // About Us (va con frame2)
  const aboutOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.5, 0.65],
    [0, 1, 0]
  );
  const aboutY = useTransform(scrollYProgress, [0.35, 0.5], [20, 0]);

  // Services (va con frame3 + 4)
  const servicesOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.8, 1],
    [0, 1, 1]
  );
  const servicesY = useTransform(scrollYProgress, [0.6, 0.8], [20, 0]);

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
    <div ref={ref} className="relative h-[260vh]">
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
            clipPath: frame2ClipPath,
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
            clipPath: frame3ClipPath,
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
            clipPath: frame4ClipPath,
          }}
        />

        {/* Overlay (tu glassmorphism original) */}
        <div className={`absolute inset-0 transition-all duration-500 ${overlayStyle}`} />

        {/* Contenido del Hero sincronizado con los frames */}
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="pl-[10%] md:pl-[15%] pr-8 max-w-5xl space-y-10">
            {/* Bloque 1: Hero inicial */}
            <motion.div
              style={{ opacity: heroTitleOpacity, y: heroTitleY }}
              className="space-y-6"
            >
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
                className={`mt-2 px-8 py-3 backdrop-blur-md border uppercase text-sm tracking-wider transition-all duration-300 w-fit rounded-sm ${
                  isNight
                    ? "bg-black/30 border-white/10 text-white hover:bg-black/40"
                    : "bg-white/30 border-white/40 text-black hover:bg-white/40"
                }`}
              >
                Learn More
              </button>
            </motion.div>

            {/* Bloque 2: About Us (segundo frame) */}
            <motion.div
              style={{ opacity: aboutOpacity, y: aboutY }}
              className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-lg max-w-3xl"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-black">
                About Us
              </h2>
              <p className="text-sm md:text-base text-black/80 leading-relaxed">
                Der Bauunternehmer blends executive project precision with deep local
                expertise to deliver premium construction services for clients in Baja
                California Sur. We manage every phase of the project, from executive
                planning to luxury residential builds.
              </p>
            </motion.div>

            {/* Bloque 3: Services (tercer/cuarto frame) */}
            <motion.div
              style={{ opacity: servicesOpacity, y: servicesY }}
              className="grid gap-4 md:grid-cols-3"
            >
              <div className="bg-white/85 backdrop-blur-md rounded-lg p-5 shadow">
                <h3 className="font-semibold mb-2 text-black">Project Development</h3>
                <p className="text-xs md:text-sm text-black/75">
                  Comprehensive management of construction projects, from architectural
                  design to permitting.
                </p>
              </div>

              <div className="bg-white/85 backdrop-blur-md rounded-lg p-5 shadow">
                <h3 className="font-semibold mb-2 text-black">Construction Management</h3>
                <p className="text-xs md:text-sm text-black/75">
                  Full oversight during building: budgeting, scheduling, and team
                  coordination.
                </p>
              </div>

              <div className="bg-white/85 backdrop-blur-md rounded-lg p-5 shadow">
                <h3 className="font-semibold mb-2 text-black">
                  Residential Construction
                </h3>
                <p className="text-xs md:text-sm text-black/75">
                  Custom home building with high-quality standards and tailored finishes.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
