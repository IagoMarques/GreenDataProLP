/**
 * Pain Points Images Configuration
 * 
 * Centraliza as importações e configurações das imagens usadas
 * no componente PainPoints.tsx
 */

// Importações das imagens locais
import informacoesEspalhadas from './pain-points/informacoes-espalhadas.png';
import processosComplexos from './pain-points/processos-complexos.png';
import dependenciaOperacional from './pain-points/dependencia-operacional.png';
// import baixaVisibilidade from './pain-points/baixa-visibilidade.jpg';
// import dadosDesarticulados from './pain-points/dados-desarticulados.jpg';
// import escalabilidadeLimitada from './pain-points/escalabilidade-limitada.jpg';
import visaoOperacionalUnificada from './pain-points/visao-operacional-unificada.png';
import escalaPorArquitetura from './pain-points/escala-por-arquitetura.png';
import rastreabilidadeEstrutural from './pain-points/rastreabilidade-estrutural.png';
import complexidadeAbsorvida from './pain-points/complexidade-absorvida.png';

/**
 * Mapeamento das imagens dos pain points
 * 
 * Usa imagens locais quando disponíveis, caso contrário usa URLs do Unsplash como fallback.
 */
export const painPointsImages = {

  'informacoes-espalhadas': informacoesEspalhadas,
  
  'processos-complexos': processosComplexos,
  
  'dependencia-operacional': dependenciaOperacional,

  'visao-operacional-unificada': visaoOperacionalUnificada,

  'escala-por-arquitetura': escalaPorArquitetura,

  'rastreabilidade-estrutural': rastreabilidadeEstrutural,

  'complexidade-absorvida': complexidadeAbsorvida,
  
} as const;

/**
 * Tipo para as chaves das imagens
 */
export type PainPointImageKey = keyof typeof painPointsImages;

/**
 * Helper function para obter a URL da imagem
 * 
 * @param key - Chave da imagem
 * @returns URL da imagem
 */
export const getPainPointImage = (key: PainPointImageKey): string => {
  return painPointsImages[key];
};
