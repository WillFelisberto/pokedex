import Link from 'next/link';
import React from 'react';

import { PokeBadge } from '@/components/atoms/PokeBadge';
import { PokemonHeader } from '@/components/atoms/PokemonHeader';
import { PokemonStatus } from '@/components/molecules/PokemonStatus';

import { PokemonType } from '@/lib/utils/poketypes';
import { formatPokemonId } from '@/lib/utils/StatusConvert';

export interface PokemonProps {
  id: number;
  name: string;
  japaneseName?: string;
  region: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  category: string;
  weight: number;
  height: number;
  weaknesses: PokemonType[];
  evolutions: {
    id: number;
    name: string;
    url: string;
    sprite: string;
    types: PokemonType[];
    level: number | null;
  }[];
  abilities: { name: string; is_hidden: boolean }[];
  genderRatio: {
    male: number;
    female: number;
  };
  baseStats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export const PokeCard: React.FC<{ pokemon: PokemonProps }> = ({ pokemon }) => {
  return (
    <div
      data-testid="poke-card"
      key={pokemon.id}
      className="bg-white min-w-[360px] max-w-[360px] p-2 rounded-lg text-center flex flex-col gap-4"
    >
      <Link href={`/pokemon/${pokemon.id}`}>
        <PokemonHeader
          name={pokemon.name}
          spriteUrl={pokemon.sprites.front_default}
          types={pokemon.types}
        />
        <div className="p-2 text-left">
          <h2 className="text-black font-bold capitalize text-3xl" data-testid="pokemon-name">
            {pokemon.name}
          </h2>
          <p
            className="text-base text-gray-700"
            data-testid="pokemon-id"
          >{`Nº${formatPokemonId(pokemon.id)}`}</p>
        </div>
        <div className="p-2 flex gap-2" data-testid="pokemon-types">
          {pokemon.types.map((type) => (
            <PokeBadge key={`${type}-${pokemon.id}`} type={type} />
          ))}
        </div>
        <div className="p-2 w-full flex gap-[20px]">
          <PokemonStatus height={pokemon.height} weight={pokemon.weight} />
        </div>
      </Link>
    </div>
  );
};
