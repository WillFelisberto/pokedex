import Image from 'next/image';

import { PokemonProps } from '@/components/organisms/PokeCard';

import getPokemonTypeStyle from '@/lib/utils/poketypes/poketypes';
import { formatPokemonId } from '@/lib/utils/StatusConvert';

import { PokeBadge } from '../PokeBadge';

type EvolutionBadgeProps = PokemonProps['evolutions'][number];

export const EvolutionBadge = ({ name, sprite, types, id }: EvolutionBadgeProps) => {
  const pokemonStyle = types.map((type) => getPokemonTypeStyle(type, true));

  return (
    <div className="flex flex-row w-full items-center gap-2 border border-[#E6E6E6]  rounded-[40px]">
      <div
        style={{ background: pokemonStyle[0].color }}
        className="rounded-[40px] relative w-[95px] h-[95px] flex items-center justify-center"
      >
        <Image
          src={pokemonStyle[0].iconUrl}
          alt={types[0]}
          width={65}
          height={65}
          style={{
            maskImage: 'linear-gradient(135deg, rgba(0 0 0 / 50%), rgba(0,0,0,0))',
            filter: 'brightness(10)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={sprite} alt={name} width={120} height={120} />
        </div>
      </div>
      <div className="text-left">
        <h4 className="font-bold text-base text-left text-black capitalize">{name}</h4>
        <span className="text-xs font-bold text-gray-700 text-left">{`Nº${formatPokemonId(id)}`}</span>
        <div className="flex gap-2 flex-wrap">
          {types.map((type) => (
            <PokeBadge badgeType="list" className="px-7 h-6 py-0" key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};
