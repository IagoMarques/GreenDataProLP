import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageWithFallback } from "../../app/components/figma/ImageWithFallback";
import { getMockupsImage } from "../../assets/images/mockupsImages.js";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const DesktopFeatureSection = ({ title, description, image }: Omit<FeatureProps, "reverse">) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [100, 0]);

  return (
    <div ref={ref} className="relative w-full mb-24 md:mb-48 text-center px-4 md:px-0">
      <motion.div 
        style={{ opacity }}
        className="max-w-3xl mx-auto mb-10 md:mb-16"
      >
        <h3 className="font-['Inter',sans-serif] font-bold text-3xl md:text-5xl text-foreground mb-4 md:mb-6 tracking-tight leading-tight md:leading-[1.1]">
          {title}
        </h3>
        <p className="font-['Inter',sans-serif] text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </motion.div>
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden bg-[#001A1A] p-1 md:p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] border border-white/5">
          {/* Top Bar / Header simulation - Hidden/Simplified on small mobile */}
          <div className="flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#78EA4E]/30" />
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/10" />
              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/10" />
            </div>
            <div className="mx-auto w-32 md:w-48 h-4 md:h-6 rounded-lg bg-white/5" />
          </div>
          
          {/* Main Content Area */}
          <div className="relative aspect-[4/3] md:aspect-[16/9] bg-white overflow-hidden rounded-b-[20px] md:rounded-b-[26px]">
            <ImageWithFallback
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureSection = ({ title, description, image, reverse }: FeatureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);

  return (
    <div ref={ref} className={`relative flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 mb-48`}>
      <motion.div 
        style={{ opacity, x: useTransform(scrollYProgress, [0.1, 0.4], [reverse ? 50 : -50, 0]) }}
        className="flex-1 text-center lg:text-left"
      >
        <h3 className="font-['Inter',sans-serif] font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight leading-[1.1]">
          {title}
        </h3>
        <p className="font-['Inter',sans-serif] text-xl text-foreground/70 leading-relaxed">
          {description}
        </p>
      </motion.div>
      
      <motion.div 
        style={{ opacity, scale }}
        className="flex-1 w-full"
      >
        <div className="rounded-[40px] bg-transparent">
          <div className="relative mx-auto w-full max-w-[280px] md:max-w-[320px] aspect-[9/19.5] bg-[#001A1A] rounded-[3rem] border-[10px] border-[#001A1A] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden ring-1 ring-white/10 ring-inset">
            {/* Screen Content */}
            <div className="absolute inset-0 bg-white">
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Notch / Dynamic Island Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#001A1A] rounded-b-2xl z-20 flex items-center justify-center">
              <div className="w-8 h-1 bg-white/10 rounded-full" />
            </div>
            
            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10" />
            
            {/* Inner Shadow for Screen depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] pointer-events-none z-10" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Features = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const footerOpacity = useTransform(footerScroll, [0, 0.5], [0, 1]);
  const footerScale = useTransform(footerScroll, [0, 0.5], [0.95, 1]);

  const cards = [
    {
      title: "App Mobile Native",
      description: "Performance de ponta e experiência fluida em qualquer dispositivo, mesmo offline.",
      image: "https://images.unsplash.com/photo-1762278804923-37f066f5e834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyZWVuJTIwdGVjaCUyMGJhY2tncm91bmQlMjBuZXR3b3JrfGVufDF8fHx8MTc2ODQ4MTU1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Geoprocessamento",
      description: "Mapas de alta precisão e processamento de dados geográficos em tempo real.",
      image: "https://images.unsplash.com/photo-1767477665600-98f3a7ee6c00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGRhdGElMjB2aXN1YWxpemF0aW9uJTIwYWJzdHJhY3QlMjAzZHxlbnwxfHx8fDE3Njg0ODE1NTJ8MA"
    },
    {
      title: "Relatórios Pro",
      description: "Geração automatizada de documentos técnicos com total conformidade normativa.",
      image: "https://images.unsplash.com/photo-1546728684-0c649e299b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdCUyMGdyZWVuJTIwbGlnaHR8ZW58MXx8fDE3Njg0ODE1NTUyfDA"
    }
  ];

  return (
    <section id="recursos" className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-[#78EA4E] font-bold uppercase tracking-widest text-sm mb-4 block">Recursos de elite</span>
          <h2 className="font-['Inter',sans-serif] font-bold text-4xl md:text-6xl text-foreground mb-8 tracking-tight">
            Tudo o que você precisa.<br />Simplesmente tudo.
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <DesktopFeatureSection
            title="Gestão estratégica integrada"
            description="Centralize toda a sua operação em uma interface inteligente que conecta projetos, locais e dados em tempo real."
            image={getMockupsImage('gestao-estrategica-integrada')}
          />

          <FeatureSection
            title="Coleta sem fronteiras."
            description="O app de campo funciona perfeitamente offline, garantindo que nenhum dado seja perdido, onde quer que você esteja."
            image={getMockupsImage('coletas-sem-fronteiras')}
            reverse
          />

          <FeatureSection
            title="Análise profunda."
            description="Transforme milhões de pontos de dados em decisões claras com dashboards que respiram inteligência."
            image="https://images.unsplash.com/photo-1736814759962-8a1f8edb2cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwZGFzaGJvYXJkJTIwbW9iaWxlJTIwZ3JlZW4lMjBtb2NrdWAlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg0MjA4NjJ8MA"
          />
        </div>

        <div ref={footerRef} className="relative mt-24">
          <motion.div 
            style={{ opacity: footerOpacity, scale: footerScale }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {cards.map((card, index) => (
              <div key={index} className="rounded-[32px] p-3 flex flex-col border border-white/5 overflow-hidden group">
                <div className="aspect-[4/3] w-full rounded-[22px] overflow-hidden mb-8">
                  <ImageWithFallback 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                
                <div className="px-6 pb-8 text-left">
                  <h4 className="font-['Inter',sans-serif] font-bold text-2xl mb-3 tracking-tight text-[#003332]">
                    {card.title}
                  </h4>
                  <p className="text-[#003332]/50 text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
