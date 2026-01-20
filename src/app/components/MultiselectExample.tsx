import { useState } from "react";
import { Multiselect, type MultiselectOption } from "./ui/multiselect";

// Exemplo de uso do componente Multiselect
export const MultiselectExample = () => {
  // Estado para diferentes exemplos
  const [selectedFruits, setSelectedFruits] = useState<string[]>(["apple"]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDisabled, setSelectedDisabled] = useState<string[]>([]);

  // Opções de exemplo
  const fruitOptions: MultiselectOption[] = [
    { value: "apple", label: "🍎 Maçã" },
    { value: "banana", label: "🍌 Banana" },
    { value: "orange", label: "🍊 Laranja" },
    { value: "grape", label: "🍇 Uva" },
    { value: "strawberry", label: "🍓 Morango" },
  ];

  const skillOptions: MultiselectOption[] = [
    { value: "react", label: "React" },
    { value: "typescript", label: "TypeScript" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "aws", label: "AWS", disabled: true },
    { value: "docker", label: "Docker" },
  ];

  const disabledOptions: MultiselectOption[] = [
    { value: "option1", label: "Opção 1" },
    { value: "option2", label: "Opção 2" },
    { value: "option3", label: "Opção 3" },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center mb-8">
        Exemplos do Componente Multiselect
      </h1>

      {/* Exemplo 1: Frutas com valor inicial */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Frutas Favoritas</h2>
        <p className="text-sm text-muted-foreground">
          Selecione suas frutas favoritas (já começa com maçã selecionada)
        </p>
        <Multiselect
          options={fruitOptions}
          value={selectedFruits}
          onChange={setSelectedFruits}
          placeholder="Selecione frutas"
        />
        <p className="text-xs text-muted-foreground">
          Selecionadas: {selectedFruits.join(", ") || "Nenhuma"}
        </p>
      </div>

      {/* Exemplo 2: Skills com item desabilitado */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Habilidades Técnicas</h2>
        <p className="text-sm text-muted-foreground">
          Selecione suas habilidades (AWS está desabilitado)
        </p>
        <Multiselect
          options={skillOptions}
          value={selectedSkills}
          onChange={setSelectedSkills}
          placeholder="Selecione habilidades"
          maxDisplayItems={2}
        />
        <p className="text-xs text-muted-foreground">
          Selecionadas: {selectedSkills.join(", ") || "Nenhuma"}
        </p>
      </div>

      {/* Exemplo 3: Componente desabilitado */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Componente Desabilitado</h2>
        <p className="text-sm text-muted-foreground">
          Este componente está desabilitado e não permite seleção
        </p>
        <Multiselect
          options={disabledOptions}
          value={selectedDisabled}
          onChange={setSelectedDisabled}
          placeholder="Componente desabilitado"
          disabled
        />
      </div>

      {/* Código de exemplo */}
      <div className="mt-12 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Como usar:</h3>
        <pre className="text-xs overflow-x-auto">
{`import { Multiselect, type MultiselectOption } from "./ui/multiselect";

const options: MultiselectOption[] = [
  { value: "option1", label: "Opção 1" },
  { value: "option2", label: "Opção 2" },
];

const [selected, setSelected] = useState<string[]>([]);

<Multiselect
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Selecione opções"
/>`}
        </pre>
      </div>
    </div>
  );
};