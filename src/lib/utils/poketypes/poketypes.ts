import { pokemonIcons } from '../pokeIconsPng';

export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

type TypeStyle = {
  iconType: 'outlined' | 'filled';
  iconUrl: string;
  color: string;
};

const getPokemonTypeStyle = (type: PokemonType, isFilled: boolean = false): TypeStyle => {
  const iconType = isFilled ? 'filled' : 'outlined';
  const iconUrl = pokemonIcons[iconType][type] || pokemonIcons.outlined.normal;

  const typeStyles: Record<PokemonType, TypeStyle> = {
    normal: { iconUrl, color: '#919AA2', iconType },
    fire: { iconUrl, color: '#FF9D55', iconType },
    water: { iconUrl, color: '#5090D6', iconType },
    electric: { iconUrl, color: '#F4D23C', iconType },
    grass: { iconUrl, color: '#63BC5A', iconType },
    ice: { iconUrl, color: '#73CEC0', iconType },
    fighting: { iconUrl, color: '#CE416B', iconType },
    poison: { iconUrl, color: '#B567CE', iconType },
    ground: { iconUrl, color: '#D97845', iconType },
    flying: { iconUrl, color: '#89AAE3', iconType },
    psychic: { iconUrl, color: '#FA7179', iconType },
    bug: { iconUrl, color: '#91C12F', iconType },
    rock: { iconUrl, color: '#C5B78C', iconType },
    ghost: { iconUrl, color: '#5269AD', iconType },
    dragon: { iconUrl, color: '#0B6DC3', iconType },
    dark: { iconUrl, color: '#5A5465', iconType },
    steel: { iconUrl, color: '#5A8EA2', iconType },
    fairy: { iconUrl, color: '#EC8FE6', iconType }
  };

  return typeStyles[type] || { iconUrl: pokemonIcons.outlined.normal, color: '#000000', iconType };
};

export default getPokemonTypeStyle;
