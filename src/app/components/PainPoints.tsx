import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { GitCommitHorizontal, BrainCircuit, HandPlatter, Glasses, Grid2x2Plus, Globe } from "lucide-react";
import { ImageWithFallback } from "../../app/components/figma/ImageWithFallback";
import { getPainPointImage } from "../../assets/images/painPointsImages.js";

const problems = [
  {
    icon: BrainCircuit,
    title: "Complexidade absorvida pelo sistema",
    description: "O GreenData assume a complexidade técnica da operação para que o usuário foque na execução e na decisão, sem lidar com estruturas, regras ou configurações desnecessárias.",
    illustration: getPainPointImage('informacoes-espalhadas'),
    color: "#F7FAF5"
  },
  {
    icon: GitCommitHorizontal,
    title: "Fluxo operacional contínuo",
    description: "Projetos, locais, coletas e dados fazem parte de um único fluxo encadeado, garantindo contexto, consistência e continuidade em toda a operação.",
    illustration: getPainPointImage('processos-complexos'),
    color: "#F7FAF5"
  },
  {
    icon: HandPlatter,
    title: "Autonomia sem dependência técnica",
    description: "A operação evolui dentro do sistema sem exigir suporte técnico constante para ajustes que fazem parte da rotina do negócio.",
    illustration: getPainPointImage('dependencia-operacional'),
    color: "#F7FAF5"
  },
  {
    icon: Glasses,
    title: "Rastreabilidade estrutural dos dados",
    description: "Cada dado nasce com origem, contexto e histórico definidos, garantindo confiabilidade técnica para auditorias, análises e decisões críticas.",
    illustration: getPainPointImage('dependencia-operacional'),
    color: "#F7FAF5"
  },
  {
    icon: Grid2x2Plus,
    title: "Escala por arquitetura",
    description: "O crescimento da operação acontece sobre a mesma base estrutural, mantendo padrão, consistência e confiabilidade dos dados ao longo do tempo.",
    illustration: getPainPointImage('escala-por-arquitetura'),
    color: "#F7FAF5"
  },
  {
    icon: Globe,
    title: "Visão operacional unificada",
    description: "A operação pode ser planejada, acompanhada e controlada a partir de uma única visão clara, sem perda de informações relevantes.",
    illustration: getPainPointImage('visao-operacional-unificada'),
    color: "#F7FAF5"
  }
];

export const PainPoints = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  // Detect mobile screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // We keep track of which index is hovered in each row
  // Row 1: 0, 1, 2 | Row 2: 3, 4, 5
  const [hoveredRow1, setHoveredRow1] = useState<number>(0);
  const [hoveredRow2, setHoveredRow2] = useState<number>(5);

  const renderRow = (startIndex: number, endIndex: number, hoveredIndex: number, setHovered: (idx: number) => void) => {
    return (
      <div className="relative flex flex-col md:flex-row gap-3 h-auto md:h-[312px] mb-3">
        {problems.slice(startIndex, endIndex + 1).map((problem, i) => {
          const actualIndex = startIndex + i;
          const isHovered = isMobile ? true : hoveredIndex === actualIndex;
          
          return (
            <motion.div
              key={actualIndex}
              onMouseEnter={() => setHovered(actualIndex)}
              animate={{ 
                flex: isHovered ? 2.5 : 1,
                backgroundColor: isHovered ? problem.color : "#003332"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20 
              }}
              className="relative rounded-[32px] overflow-hidden cursor-pointer flex flex-col min-h-[240px] md:min-h-0 border border-[#003332]/5  drop-shadow-xl group"
            >
              <div className="relative z-20 p-4 md:p-3 h-full flex flex-col justify-between pointer-events-none">
                {/* Top: Icon and Title */}
                <div className="w-full">
                  <motion.div 
                    layout
                    className={`mb-4 flex mt-2 items-center justify-center scale-120 w-10 h-8 rounded-xl transition-all duration-500 ${isHovered ? 'bg-[#FFFFFF00] text-[#78EA4E]' : 'bg-[#FFFFFF00] text-[#78EA4E]'}`}
                  >
                    <problem.icon size={20} strokeWidth={1.5} />
                  </motion.div>
                  
                  <div className="relative h-16 md:h-20 overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.h3 
                        key={isHovered ? 'hover' : 'normal'}
                        initial={{ opacity: 0, y: isHovered ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: isHovered ? -10 : 10 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute font-['Inter',sans-serif] font-bold tracking-tight leading-tight w-full ${isHovered ? 'text-[#003332] text-2xl md:text-3xl' : 'text-white text-lg md:text-xl'}`}
                      >
                        {problem.title}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom: Description (only visible when expanded) */}
                <div className="w-full">
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="max-w-[60%]"
                      >
                        <p className="font-['Inter',sans-serif] text-[#003332]/70 text-base md:text-lg m-2 leading-relaxed">
                          {problem.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 3D Isometric Illustration */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ y: 150, opacity: 0, scale: 0.85 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 120, opacity: 0, scale: 0.9 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 100,
                      damping: 18,
                      delay: 0.05
                    }}
                    className="absolute bottom-[-10%] right-[-28%] w-[90%] h-[90%] z-10 pointer-events-none"
                  >
                    <div className="relative w-full h-full">
                      <ImageWithFallback 
                        src={problem.illustration} 
                        alt={problem.title}
                        className="w-full h-full object-contain object-bottom filter brightness-100"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8">
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="relative mt-50 mb-12 text-center"
        >
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[#78EA4E] my-10 font-bold uppercase tracking-[0.2em] text-xs mb-3 block"
          >
            O desafio atual
          </motion.span>
          <h2 className="font-['Inter',sans-serif] font-bold text-3xl md:text-5xl text-[#003332] tracking-tight mb-4 leading-tight">
            A gestão ambiental em outro nível.
          </h2>
          <p className="font-['Inter',sans-serif] text-lg text-[#003332]/60 max-w-2xl mx-auto leading-relaxed">
            Eliminamos os obstáculos que impedem sua operação de ser verdadeiramente eficiente e baseada em dados reais.
          </p>
        </motion.div>

        <div className="relative flex flex-col">
          {renderRow(0, 2, hoveredRow1, setHoveredRow1)}
          {renderRow(3, 5, hoveredRow2, setHoveredRow2)}
        </div>
      </div>
    </section>
  );
};
