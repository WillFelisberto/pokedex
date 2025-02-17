import Image from 'next/image';
import React from 'react';
import tinycolor from 'tinycolor2';

import getPokemonTypeStyle, { PokemonType } from '@/lib/utils/poketypes/poketypes';

interface PokemonHeaderProps {
  name: string;
  spriteUrl: string;
  types: PokemonType[];
}

export const PokemonHeader: React.FC<PokemonHeaderProps> = ({ name, spriteUrl, types }) => {
  const colors = types.map((type) => getPokemonTypeStyle(type).color);
  const iconURL = types.map((type) => getPokemonTypeStyle(type, true).iconUrl);

  const firstColor = tinycolor(colors[0]).lighten(5).toString();
  const LastColor = tinycolor(colors[0]).lighten(25).toString();

  const gradient = `linear-gradient(135deg, ${firstColor} 50%, ${LastColor} 100%)`;

  return (
    <>
      <div
        data-testid="pokemon-header"
        className="relative w-full h-[307px] flex items-center justify-center rounded-b-3xl overflow-hidden"
        style={{ background: gradient, clipPath: 'ellipse(60% 65% at 50% 30%)' }}
      >
        <div className="absolute inset-0 flex items-center justify-center  ">
          <div className="absolute inset-0 w-1/2 bg-gradient-to-l from-white/15 to-transparent"></div>

          <div className="absolute top-[10%] ">
            <Image
              src={iconURL[0]}
              alt={types[0]}
              width={140}
              height={140}
              style={{
                maskImage: 'linear-gradient(135deg, rgba(0 0 0 / 50%), rgba(0,0,0,0))',
                filter: 'brightness(10)'
              }}
            />
          </div>
        </div>
      </div>
      <Image
        src={spriteUrl}
        alt={name}
        width={215}
        height={215}
        className="absolute z-10 left-1/2 transform bottom-0 -translate-x-1/2"
      />
    </>
  );
};
