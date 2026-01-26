import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Agendamento = () => {
  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="min-h-screen bg-background py-32 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex gap-2 text-foreground/70 hover:text-foreground transition-colors font-['Inter',sans-serif] font-medium text-sm md:text-base group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para tela inicial
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-['Inter',sans-serif] font-bold text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
            Agende uma demonstração do GreenData Pro
          </h1>
          <p className="font-['Inter',sans-serif] text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Veja como o GreenData se adapta à realidade das suas atividades ambientais.
          </p>
        </motion.div>


        {/* Calendly Inline Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >

          <div className="flex justify-center">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/iagofariasmarques/greendata-pro-demo?hide_event_type_details=1&hide_gdpr_banner=1&background_color=f7faf5&text_color=003332&primary_color=003332"
              style={{ minWidth: '320px', width: '1000px', height: '700px'}}
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
