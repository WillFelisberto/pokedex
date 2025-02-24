// Converte altura de decímetros para metros
export const convertDecimetresToMeters = (heightInDecimetres: number): number => {
  return heightInDecimetres / 10;
};

// Converte peso de hectogramas para quilogramas
export const convertHectogramsToKilograms = (weightInHectograms: number): number => {
  return weightInHectograms / 10;
};

export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, '0');
};
