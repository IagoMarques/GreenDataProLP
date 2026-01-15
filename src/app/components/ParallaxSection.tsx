import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgImage1 from "figma:asset/6b5668bcbe334c143566464987e47b0f7bb336ae.png";

export const ParallaxSection = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-[#1a1a1a]">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={imgImage1} 
          alt="Environmental Background" 
          className="w-full h-[120%] object-cover opacity-60 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-transparent to-[#1a1a1a]" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.p 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-['Titillium_Web',sans-serif] text-3xl lg:text-4xl leading-relaxed text-gray-400 font-bold"
        >
          Na prática, <span className="text-white">muitos sistemas não acompanham</span> a dinâmica da operação ambiental. Eles <span className="text-white">resolvem partes</span> do processo, <span className="text-white">mas não sustentam</span> o fluxo completo do dia a dia.
        </motion.p>
      </div>
    </section>
  );
};
