import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

export const Agendamento = () => {

  /* Load Calendly script
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
  */

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    empresa: '',
    emailEmpresa: '',
    tipoEmpresa: '',
    tamanhoEmpresa: '',
    numeroContato: '',
    observacao: ''
  }); 

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("https://formspree.io/f/xaqjwlly", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar");
      }
  
      alert("Formulário enviado com sucesso! Entraremos em contato em breve.");
  
      setFormData({
        nome: '',
        email: '',
        empresa: '',
        emailEmpresa: '',
        tipoEmpresa: '',
        tamanhoEmpresa: '',
        numeroContato: '',
        observacao: ''
      });
  
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

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
          <p className="font-['Inter',sans-serif] text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
            Veja como o GreenData se adapta à realidade das suas atividades ambientais.
          </p>
        </motion.div>


        {/* Formulário de Agendamento */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="font-['Inter',sans-serif] font-semibold text-2xl text-foreground mb-8 text-center">
              Solicite uma demonstração
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Linha 1: Nome */}
              <div>
                <label htmlFor="nome" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif]"
                  placeholder="Digite seu nome completo"
                />
              </div>

              {/* Linha 2: Email + Número para contato (2 colunas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif]"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="numeroContato" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                    Número para contato *
                  </label>
                  <input
                    type="tel"
                    id="numeroContato"
                    name="numeroContato"
                    value={formData.numeroContato}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif]"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              {/* Linha 3: Empresa */}
              <div>
                <label htmlFor="empresa" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                  Empresa *
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif]"
                  placeholder="Nome da empresa"
                />
              </div>

              {/* Linha 4: Email da empresa + Tipo (2 colunas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emailEmpresa" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                    E-mail da empresa *
                  </label>
                  <input
                    type="email"
                    id="emailEmpresa"
                    name="emailEmpresa"
                    value={formData.emailEmpresa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif]"
                    placeholder="contato@empresa.com"
                  />
                </div>
                <div>
                  <label htmlFor="tipoEmpresa" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                    Tipo de empresa *
                  </label>
                  <input
                    type="text"
                    id="tipoEmpresa"
                    name="tipoEmpresa"
                    value={formData.tipoEmpresa}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif]"
                    placeholder="área de atuação"
                  />
                </div>
              </div>

              {/* Linha 5: Tamanho da empresa */}
              <div>
                <label htmlFor="tamanhoEmpresa" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                  Tamanho da empresa *
                </label>
                <select
                  id="tamanhoEmpresa"
                  name="tamanhoEmpresa"
                  value={formData.tamanhoEmpresa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif] bg-white"
                >
                  <option value="">Selecione o tamanho</option>
                  <option value="1-10">1-10 Colaboradores</option>
                  <option value="11-50">11-50 Colaboradores</option>
                  <option value="51-200">51-200 Colaboradores</option>
                  <option value="201-500">201-500 Colaboradores</option>
                  <option value="500+">Mais de 500 Colaboradores</option>
                </select>
              </div>

              {/* Linha 6: Observações */}
              <div>
                <label htmlFor="observacao" className="block font-['Inter',sans-serif] font-medium text-foreground mb-2">
                  Observações
                </label>
                <textarea
                  id="observacao"
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors font-['Inter',sans-serif] resize-none"
                  placeholder="Conte-nos um pouco sobre suas necessidades ou dúvidas..."
                />
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-['Inter',sans-serif] font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Solicitar demonstração
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>


      </div>
    </section>
  );
};
