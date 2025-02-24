import Image from 'next/image';
import React from 'react';

import { EvolutionBadge } from '@/components/atoms/EvolutionBadge';
import { PokeBadge } from '@/components/atoms/PokeBadge';
import { PokemonHeader } from '@/components/atoms/PokemonHeader';
import { PokemonStatus } from '@/components/molecules/PokemonStatus';

import { PokemonType } from '@/lib/utils/poketypes';
import { formatPokemonId } from '@/lib/utils/StatusConvert';

export interface PokemonProps {
  id: number;
  name: string;
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
}

export const PokeCard: React.FC<{ pokemon: PokemonProps }> = ({ pokemon }) => {
  return (
    <div
      data-testid="poke-card"
      key={pokemon.id}
      className="bg-white min-w-[360px] max-w-[360px] p-4 rounded-lg text-center flex flex-col gap-4"
    >
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
      <hr className="px-2 border-gray-300 " />

      <div className="p-2 gap-3 flex flex-col text-left flex-wrap">
        <h2 className="text-lg text-black font-bold">Fraquezas</h2>
        <div className="flex gap-2 flex-wrap" data-testid="pokemon-weaknesses">
          {pokemon.weaknesses.map((w) => (
            <PokeBadge className="w-[48%]" key={w + pokemon.name} type={w} />
          ))}
        </div>
      </div>
      <hr className="px-2 border-gray-300 " />

      <div className="p-2 gap-3 text-left flex flex-wrap flex-col">
        <h2 className="text-lg text-black font-bold">Evoluções</h2>
        {pokemon.evolutions.length > 0 ? (
          <div className="flex items-center gap-2 flex-wrap border py-4 px-2 rounded-[15px] border-[#E6E6E6]  ">
            {pokemon.evolutions.map((evo) => (
              <section
                className="w-full justify-center flex items-center gap-2 flex-col"
                key={evo.id + '' + evo.level + '' + evo.name}
              >
                {evo.level !== null && (
                  <div className="text-sm w-full justify-center flex items-center gap-4 text-[#173EA5] font-bold">
                    <Image
                      src="/icons/svg/move-down.svg"
                      alt="seta para baixo"
                      width={18}
                      height={18}
                    />

                    {`Nível ${evo.level}`}
                  </div>
                )}
                <EvolutionBadge
                  id={evo.id}
                  level={evo.level}
                  name={evo.name}
                  sprite={evo.sprite}
                  types={evo.types}
                  url={evo.url}
                  key={evo.id}
                />
              </section>
            ))}
          </div>
        ) : (
          <p className="text-lg text-black font-bold">Não possui evolução</p>
        )}
      </div>
    </div>
  );
};
