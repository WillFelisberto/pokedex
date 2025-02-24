import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import { PokemonType } from '@/lib/utils/poketypes';
import getPokemonTypeStyle from '@/lib/utils/poketypes/poketypes';

interface PokemonTypeBadgeProps {
  type: PokemonType;
  className?: string;
  badgeType?: 'detail' | 'list';
}

export const PokeBadge: React.FC<PokemonTypeBadgeProps> = ({
  type,
  className,
  badgeType = 'detail'
}) => {
  const { iconUrl } = getPokemonTypeStyle(type, true);

  return (
    <div
      data-testid="poke-badge"
      aria-label={type}
      className={clsx(
        'flex w-fit items-center gap-2 text-white px-3 py-2 rounded-full',
        { [`bg-pokemon-${type}`]: type },
        className
      )}
    >
      <div
        className={clsx(
          'w-6 h-6 flex items-center justify-center rounded-full overflow-visible',
          badgeType === 'list' ? 'brightness-[10]' : 'bg-white'
        )}
      >
        <Image src={iconUrl} alt={type} width={13} height={13} />
      </div>
      {badgeType !== 'list' && (
        <span className="font-semibold text-sm">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      )}
    </div>
  );
};
