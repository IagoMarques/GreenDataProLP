// Importações das imagens locais
import GraficosPersonalizaveis from './features/chart-feature.png';
import AmbienteLab from './features/lab-feature.png';
import LiveStatus from './features/point-status.png';

/**
 * Mapeamento das imagens
 * 
 * Usa imagens locais quando disponíveis, caso contrário usa URLs do Unsplash como fallback.
 */
export const FeaturesImages = {
  'graficos-personalizaveis': GraficosPersonalizaveis,
  'ambiente-lab': AmbienteLab,
  'live-status': LiveStatus,
} as const;

/**
 * Tipo para as chaves das imagens
 */
export type FeaturesImageKey = keyof typeof FeaturesImages;

/**
 * Helper function para obter a URL da imagem
 * 
 * @param key - Chave da imagem
 * @returns URL da imagem
 */
export const getFeatureImage = (key: FeaturesImageKey): string => {
  return FeaturesImages[key];
};
