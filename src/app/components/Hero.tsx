import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PrimaryButton } from "./PrimaryButton";
import { getMockupsImage } from "@/assets/images/mockupsImages";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setIsLargeScreen(window.innerWidth >= 1536); // 2xl breakpoint
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive scale calculation
  const getDynamicMaxScale = () => {
    if (viewportHeight === 0) return 1.05;
    const baseMax = isLargeScreen ? 1.25 : 1.1;
    if (viewportHeight < 700) return Math.min(baseMax, 1.02);
    if (viewportHeight < 900) return Math.min(baseMax, 1.08);
    return baseMax;
  };

  const maxScale = getDynamicMaxScale();

  // Text layer animations: Fade out slightly slower to feel more natural
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  
  // Image animation logic:
  const getInitialY = () => {
    // Detect mobile screens (typically < 768px width)
    const isMobileScreen = window.innerWidth < 768;

    if (isLargeScreen) return "60vh"; // Moved closer to content
    if (isMobileScreen) {
      // Position higher on mobile to ensure visibility
      return viewportHeight < 600 ? "15vh" : "25vh"; // Moved much closer
    }
    if (viewportHeight < 600) return "50vh"; // Moved closer
    return "60vh"; // Moved closer
  };

  // Natural transition: The image reaches its peak at the end of the scroll
  // and then flows out naturally with the next section.
  const getFinalY = () => {
    const isMobileScreen = window.innerWidth < 768;
    return isMobileScreen ? getInitialY() : "0vh"; // Mobile: no movement, stays in initial position
  };

  const imgY = useTransform(
    scrollYProgress,
    [0, 3],
    [getInitialY(), getFinalY()]
  );
  
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.5], // Adjusted for shorter section - complete scaling earlier
    [0.8, maxScale]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-background mb-[-620px] md:mb-[-200px]"
    >
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center text-center px-4">
        
        {/* Text Layer */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-4xl mx-auto w-full absolute top-[20svh] lg:top-[15svh] z-20 pointer-events-none"
        >
          <div className="px-4">
            <h1 className="font-['Inter',sans-serif] font-bold text-3xl sm:text-5xl md:text-6xl lg:text-8xl text-foreground tracking-[-0.02em] leading-[1.1] mb-4 md:mb-6">
              O futuro da gestão ambiental é <span className="bg-gradient-to-r from-[#003332] to-[#78EA4E] bg-clip-text text-transparent">Pro</span>
            </h1>
            
            <p className="font-['Inter',sans-serif] text-base md:text-xl lg:text-2xl text-foreground/70 mb-6 md:mb-10 leading-relaxed max-w-2xl mx-auto">
            O GreenData Pro é uma plataforma completa para gestão e monitoramento de dados ambientais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-['Inter',sans-serif] pointer-events-auto">
              <Link to="/agendamento">
                <PrimaryButton className="w-full sm:w-auto px-6 py-3 md:py-4 flex items-center justify-center gap-2 group text-base md:text-lg">
                  Agendar Demonstração
                </PrimaryButton>
              </Link>
              <a href="#recursos" className="text-foreground font-medium hover:underline flex items-center gap-1 group text-base md:text-lg">
                Conheça os recursos
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Image Layer - Optimized mapping to exit precisely as the scroll ends */}
        <motion.div 
          style={{ y: imgY, scale: imgScale }}
          className="w-full max-w-[95vw] md:max-w-6xl px-4 z-10 will-change-transform flex justify-center items-center"
        >
          <div className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,51,50,0.2)] border border-primary/5 bg-white">
            <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
              <ImageWithFallback 
                src={getMockupsImage('gestao-estrategica-integrada')}
                alt="Plataforma Greendata Pro"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
