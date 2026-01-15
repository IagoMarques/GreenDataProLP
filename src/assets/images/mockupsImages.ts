/**
 * Pain Points Images Configuration
 * 
 * Centraliza as importações e configurações das imagens usadas
 * no componente PainPoints.tsx
 */

// Importações das imagens locais
import GestaoEstrategicaIntegrada from './mockups/gestao-estrategica-integrada.png';
import ColetaSemFronteiras from './mockups/coletas-sem-fronteiras.png';
// import AnaliseProfunda from './mockups/analise-profunda.png';
// import baixaVisibilidade from './pain-points/baixa-visibilidade.jpg';
// import dadosDesarticulados from './pain-points/dados-desarticulados.jpg';
// import escalabilidadeLimitada from './pain-points/escalabilidade-limitada.jpg';

/**
 * Mapeamento das imagens dos pain points
 * 
 * Usa imagens locais quando disponíveis, caso contrário usa URLs do Unsplash como fallback.
 */
export const mockupsImages = {
  'gestao-estrategica-integrada': GestaoEstrategicaIntegrada,
  
  'processos-complexos': ColetaSemFronteiras,
  
  /*'dependencia-operacional': AnaliseProfunda,*/
  
  'baixa-visibilidade': 
    'https://images.unsplash.com/photo-1567039411936-44e1b970873b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMGlzb21ldHJpYyUyMGRhdGElMjBhbmFseXRpY3MlMjBjaGFydCUyMGdsYXNzfGVufDF8fHx8MTc2ODQwMzY4MHww',
  
  'dados-desarticulados': 
    'https://images.unsplash.com/photo-1673280115854-279696d9e648?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1hZ25pZnlpbmclMjBnbGFzcyUyMGRhdGElMjBncmVlbnxlbnwxfHx8fDE3Njg0MDM2ODB8MA',
  
  'escalabilidade-limitada': 
    'https://images.unsplash.com/photo-1658806312303-6815563cd9d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHNhdGVsbGl0ZSUyMGNvbm5lY3Rpb24lMjBncmVlbiUyMGdsYXNzfGVufDF8fHx8MTc2ODQwMzg1MXww',
} as const;

/**
 * Tipo para as chaves das imagens
 */
export type MockupsImageKey = keyof typeof mockupsImages;

/**
 * Helper function para obter a URL da imagem
 * 
 * @param key - Chave da imagem
 * @returns URL da imagem
 */
export const getMockupsImage = (key: MockupsImageKey): string => {
  return mockupsImages[key];
};
