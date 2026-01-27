// Importações das imagens locais
import GraficosPersonalizaveis from './features/chart-feature.png';


/**
 * Mapeamento das imagens
 * 
 * Usa imagens locais quando disponíveis, caso contrário usa URLs do Unsplash como fallback.
 */
export const GraficosImages = {
  'graficos-personalizaveis': GraficosPersonalizaveis,
} as const;

/**
 * Tipo para as chaves das imagens
 */
export type GraficosImageKey = keyof typeof GraficosImages;

/**
 * Helper function para obter a URL da imagem
 * 
 * @param key - Chave da imagem
 * @returns URL da imagem
 */
export const getGraficosImage = (key: GraficosImageKey): string => {
  return GraficosImages[key];
};
