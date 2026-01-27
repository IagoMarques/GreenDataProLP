import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ImageWithFallback } from "../../app/components/figma/ImageWithFallback";
import { getMockupsImage } from "../../assets/images/mockupsImages.js";
import { getFeatureImage } from "@/assets/images/featuresImage.js";

// Video component for card content
const VideoCard = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <video
    src={src}
    className={className}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-label={alt}
  />
);

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  isVideo?: boolean;
}

const DesktopFeatureSection = ({ title, description, image, isVideo }: Omit<FeatureProps, "reverse"> & { isVideo?: boolean }) => {
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


          {/* Main Content Area */}
          <div className="relative aspect-[16/9] bg-white overflow-hidden rounded-[20px] md:rounded-[28px]">
            {isVideo ? (
              <VideoCard
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const FeatureSection = ({ title, description, image, reverse, isVideo }: FeatureProps) => {
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
              {isVideo ? (
                <VideoCard
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              )}
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
      title: "Ambiente laboratorial integrado",
      description: "O ambiente do laboratório já vem estruturado e conectado à operação e ao cliente, permitindo analisar, registrar e devolver resultados sem etapas paralelas ou controles externos.",
      content: getFeatureImage('ambiente-lab'),
      isVideo: false
    },
    {
      title: "Relatórios e gráficos personalizáveis",
      description: "Crie relatórios e visualizações a partir de qualquer dado registrado no sistema. A visualização se adapta ao que você precisa analisar, do jeito certo para cada decisão.",
      content: getFeatureImage('graficos-personalizaveis'),
      isVideo: false
    },
    {
      title: "Operação sincronizada em tempo real",
      description: "Os status dos pontos de monitoramento se atualizam conforme a ação acontece em campo. Com conexão, o escritório acompanha a operação em tempo real, com total visibilidade.",
      content: getFeatureImage('live-status'),
      isVideo: false
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
            title="Gestão de projetos e localizações"
            description="Centralize toda a sua operação em uma interface inteligente que conecta projetos, locais e dados em tempo real."
            image="/videos/projects-locs.mkv"
            isVideo={true}
          />

          <FeatureSection
            title="Coleta sem fronteiras."
            description="O app de campo funciona perfeitamente offline, garantindo que nenhum dado seja perdido, onde quer que você esteja."
            image="/videos/offline.mp4"
            isVideo={true}
            reverse
          />

          <FeatureSection
            title="Documentações Automatizadas."
            description="Os dados coletados alimentam automaticamente o COC e outros documentos operacionais. Nada precisa ser refeito, digitado novamente ou conferido manualmente."
            image="/videos/chain.mp4"
            isVideo={true}
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
                  {card.isVideo ? (
                    <VideoCard
                      src={card.content}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <ImageWithFallback
                      src={card.content}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
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
