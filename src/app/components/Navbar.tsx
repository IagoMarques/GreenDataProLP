import React from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
      setIsOpen(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <motion.nav 
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ 
        y: visible ? 0 : -100, 
        x: "-50%", 
        opacity: visible ? 1 : 0 
      }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="fixed top-6 left-1/2 z-50 w-[90%] max-w-4xl font-['Inter',sans-serif]"
    >
      <div className="relative group">
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-full border border-white/40 shadow-[0_8px_32px_0_rgba(0,51,50,0.08)] transition-all duration-500 group-hover:bg-white/50 group-hover:shadow-[0_8px_32px_0_rgba(120,234,78,0.15)]" />
        
        {/* Inner Highlight for Liquid Effect */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        
        <div className="relative z-10 px-6 py-2.5 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#003332] flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <Leaf size={16} className="text-[#78EA4E]" />
            </div>
            <span className="font-bold text-[#003332] tracking-tight">
              Greendata<span className="text-[#78EA4E]">Pro</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="https://greentech.com.br" className="flex items-center gap-1 text-[12px] uppercase tracking-wider text-[#003332]/40 hover:text-[#003332] transition-colors font-bold mr-4 group/link">
              Greentech
              <ArrowUpRight size={12} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
            <a href="#solucao" className="text-[14px] text-[#003332]/70 hover:text-[#003332] transition-colors font-medium">Solução</a>
            <a href="#recursos" className="text-[14px] text-[#003332]/70 hover:text-[#003332] transition-colors font-medium">Recursos</a>
            <a href="#contato" className="text-[14px] text-[#003332]/70 hover:text-[#003332] transition-colors font-medium">Contato</a>
            <a 
              href="#demo" 
              className="bg-[#003332] text-white px-6 py-2 rounded-full text-[14px] font-semibold hover:bg-[#78EA4E] hover:text-[#003332] transition-all active:scale-95 shadow-lg shadow-[#003332]/10"
            >
              Agendar Demo
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-[#003332] p-2 rounded-full hover:bg-[#003332]/5 transition-colors"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - also Liquid Glass */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 overflow-hidden rounded-[32px] border border-white/40 shadow-2xl md:hidden"
          >
            <div className="absolute inset-0 bg-white/80 backdrop-blur-3xl" />
            <div className="relative z-10 p-6 flex flex-col gap-2">
              <a href="#solucao" className="text-[#003332] text-lg font-semibold py-3 px-4 hover:bg-[#003332]/5 rounded-2xl transition-colors" onClick={() => setIsOpen(false)}>Solução</a>
              <a href="#recursos" className="text-[#003332] text-lg font-semibold py-3 px-4 hover:bg-[#003332]/5 rounded-2xl transition-colors" onClick={() => setIsOpen(false)}>Recursos</a>
              <a href="#contato" className="text-[#003332] text-lg font-semibold py-3 px-4 hover:bg-[#003332]/5 rounded-2xl transition-colors" onClick={() => setIsOpen(false)}>Contato</a>
              <button className="w-full bg-[#003332] text-white py-4 rounded-2xl font-bold text-lg mt-4 hover:bg-[#78EA4E] hover:text-[#003332] transition-all">
                Agendar Demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
