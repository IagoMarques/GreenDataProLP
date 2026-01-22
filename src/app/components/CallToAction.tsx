import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "./PrimaryButton";
import { getLogoImage } from "../../assets/images/logosImages";

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section id="contato" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-2 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#003332] rounded-[12px] md:rounded-[56px] md:p-24 lg:px-32 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-0 mt-[60px] md:mt-[0px] mb-[24px] md:mb-[0px]">
            <h2 className="font-['Inter',sans-serif] font-bold text-3xl md:text-6xl lg:text-7xl mb-8 md:mb-10 tracking-tight leading-tight md:leading-[1.05] ">
              Eleve sua operação para o nível <span className="text-[#78EA4E]">Pro.</span>
            </h2>
            <p className="font-['Inter',sans-serif] text-lg md:text-2xl text-white/70 mb-26 md:mb-12 leading-relaxed">
              Junte-se à nova era do monitoramento ambiental inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-sm sm:max-w-none mx-auto">
              <Link to="/agendamento">
                <PrimaryButton className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 !text-lg md:!text-xl !bg-white !text-[#003332] flex items-center justify-center gap-2 group">
                  Agendar agora
                </PrimaryButton>
              </Link>
              <PrimaryButton
                onClick={() => navigate("/agendamento")}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 !text-lg md:!text-xl !bg-white !text-[#003332] flex items-center justify-center gap-2 group"
              >
                Agendar demo
              </PrimaryButton>
              <button className="w-full sm:w-auto bg-transparent text-white border border-white/20 px-8 md:px-10 py-4 md:py-5 rounded-[12px] font-medium text-lg md:text-xl hover:bg-white/5 transition-all active:scale-95">
                Falar com consultor
              </button>
            </div>
          </div>
          {/* Subtle gradient light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-[#78EA4E]/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/5 py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 font-['Inter',sans-serif]">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 scale-110 overflow-hidden">
              <img
                src={getLogoImage('logotipo-verde-lima')}
                alt="GreenData Pro Logo"
                className="w-5 h-5 object-contain"
              />
            </div>
              <span className="font-bold text-xl tracking-tight text-[#003332]">
                GreenData<span className="text-[#78EA4E]">Pro</span>
              </span>
            </div>
            <p className="text-[#003332]/60 text-sm leading-relaxed max-w-[200px] mb-4">
              O padrão Pro para operações ambientais de alta complexidade.
            </p>
            <a href="https://greentech-vision-main.vercel.app/" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78EA4E] hover:text-[#003332] transition-colors group/back">
              Voltar para Greentech
              <ArrowUpRight size={14} className="group-hover/back:-translate-y-0.5 group-hover/back:translate-x-0.5 transition-transform" />
            </a>
          </div>
          
          <div>
            <h4 className="font-bold text-[#003332] mb-6 text-[12px] uppercase tracking-wider">Produtos</h4>
            <ul className="space-y-4 text-[13px] text-[#003332]/60">
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Software de Monitoramento</a></li>
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">App Mobile</a></li>
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Dashboards BI</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#003332] mb-6 text-[12px] uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-4 text-[13px] text-[#003332]/60">
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Centro de Ajuda</a></li>
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Documentação</a></li>
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#003332] mb-6 text-[12px] uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-4 text-[13px] text-[#003332]/60">
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Carreiras</a></li>
              <li><a href="#" className="hover:text-[#003332] transition-colors font-medium">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[12px] text-[#003332]/40">
          <p>© 2026 Greendata Pro Inc. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#003332]/60 transition-colors font-medium">Política de Privacidade</a>
            <a href="#" className="hover:text-[#003332]/60 transition-colors font-medium">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
