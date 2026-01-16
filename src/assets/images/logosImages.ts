// Importações das imagens locais
import LogotipoVerdeLima from './logos/logotipo-verde-lima.png';


/**
 * Mapeamento das imagens
 * 
 * Usa imagens locais quando disponíveis, caso contrário usa URLs do Unsplash como fallback.
 */
export const LogosImages = {
  'logotipo-verde-lima': LogotipoVerdeLima,
} as const;

/**
 * Tipo para as chaves das imagens
 */
export type LogoImageKey = keyof typeof LogosImages;

/**
 * Helper function para obter a URL da imagem
 * 
 * @param key - Chave da imagem
 * @returns URL da imagem
 */
export const getLogoImage = (key: LogoImageKey): string => {
  return LogosImages[key];
};
