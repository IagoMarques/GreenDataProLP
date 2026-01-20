import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Multiselect, type MultiselectOption } from "./ui/multiselect";
import { PrimaryButton } from "./PrimaryButton";
import { ptBR } from "date-fns/locale/pt-BR";

const HORARIOS_DISPONIVEIS: MultiselectOption[] = [
  { value: "08:00", label: "08:00" },
  { value: "09:00", label: "09:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
];

export const Agendamento = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedHorarios, setSelectedHorarios] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    tamanho: "",
    observacoes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tamanho: value }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dados do agendamento
    const agendamentoData = {
      id: Date.now().toString(),
      selectedDate,
      selectedHorarios,
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // Salvar no localStorage
    try {
      const agendamentosExistentes = JSON.parse(localStorage.getItem('agendamentos') || '[]');
      const novosAgendamentos = [...agendamentosExistentes, agendamentoData];
      localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));

      console.log("Agendamento salvo:", agendamentoData);
      alert("Demonstração agendada com sucesso! Os dados foram salvos localmente.");
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
      alert("Erro ao salvar agendamento. Tente novamente.");
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
          <p className="font-['Inter',sans-serif] text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
            Veja como o GreenData se adapta à realidade das suas atividades ambientais.
          </p>
        </motion.div>

        {/* Main Content - Two Columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12 mx-12"
        >
          {/* Left Column - Calendar (1 column) */}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border lg:col-span-1 flex flex-col">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              className="w-full"
              classNames={{
                day_selected:
                  "bg-[#78EA4E] text-[#003332] hover:bg-[#78EA4E] hover:text-[#003332] focus:bg-[#78EA4E] focus:text-[#003332] font-semibold",
              }}
            />
            {/* Horário Preferido Multi-Select */}
            <div className="mt-6 pt-6 border-t border-border">
              <Label className="font-['Inter',sans-serif] text-foreground font-medium mb-3 block">
                Horário preferido
              </Label>
              <Multiselect
                options={HORARIOS_DISPONIVEIS}
                value={selectedHorarios}
                onChange={setSelectedHorarios}
                placeholder="Selecione os horários"
                maxDisplayItems={3}
              />
            </div>
          </div>

          {/* Right Column - Form (2 columns) bg-card*/}
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border lg:col-span-2">
            <form id="agendamento-form" onSubmit={handleSubmit} className="space-y-6 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome do Contato */}
                <div className="space-y-2">
                  <Label htmlFor="nome" className="font-['Inter',sans-serif] text-foreground font-medium">
                    Nome do Contato
                  </Label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    placeholder="Quem vai participar da demo"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="font-['Inter',sans-serif]"
                  />
                </div>

                {/* Nome da Empresa */}
                <div className="space-y-2">
                  <Label htmlFor="empresa" className="font-['Inter',sans-serif] text-foreground font-medium">
                    Nome da Empresa
                  </Label>
                  <Input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nome da empresa ou consultoria"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    required
                    className="font-['Inter',sans-serif]"
                  />
                </div>

                {/* Telefone / WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="telefone" className="font-['Inter',sans-serif] text-foreground font-medium">
                    Telefone / WhatsApp <span className="text-muted-foreground">(opcional)</span>
                  </Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="Telefone para contato, se necessário"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="font-['Inter',sans-serif]"
                  />
                </div>

                {/* E-mail Corporativo */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-['Inter',sans-serif] text-foreground font-medium">
                    E-mail Corporativo
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Seu email corporativo"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="font-['Inter',sans-serif]"
                  />
                </div>
              </div>

              {/* Tamanho da Empresa */}
              <div className="space-y-2 ">
                <Label htmlFor="tamanho" className="font-['Inter',sans-serif] text-foreground font-medium">
                  Tamanho da Empresa
                </Label>
                <Select value={formData.tamanho} onValueChange={handleSelectChange} required>
                  <SelectTrigger id="tamanho" className="font-['Inter',sans-serif]">
                    <SelectValue placeholder="Selecione o tamanho da empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="micro">1–10 colaboradores</SelectItem>
                    <SelectItem value="pequena">11–50 colaboradores</SelectItem>
                    <SelectItem value="media">51–200 colaboradores</SelectItem>
                    <SelectItem value="grande">200+ colaboradores</SelectItem>
                    <SelectItem value="multinacional">Multinacional (1000+ colaboradores)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Observações */}
              <div className="space-y-2 h-full">
                <Label htmlFor="observacoes" className="font-['Inter',sans-serif] text-foreground font-medium">
                  Observações <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Textarea
                  id="observacoes"
                  name="observacoes"
                  placeholder="Alguma informação importante para a demonstração?"
                  value={formData.observacoes}
                  onChange={handleInputChange}
                  className="font-['Inter',sans-serif] min-h-24"
                />
              </div>
            </form>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <PrimaryButton
            type="submit"
            form="agendamento-form"
            className="w-full sm:w-auto px-10 py-5 !text-lg md:!text-xl"
          >
            Agendar Demonstração
          </PrimaryButton>
        </motion.div>
      </div>
    </section>
  );
};
