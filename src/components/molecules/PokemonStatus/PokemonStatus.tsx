import { StatItem } from '@/components/atoms/StatItem';
import { PokemonProps } from '@/components/organisms/PokeCard';

import { convertHectogramsToKilograms, convertDecimetresToMeters } from '@/lib/utils/StatusConvert';

type PokemonStatusProps = Pick<PokemonProps, 'height' | 'weight'>;

export const PokemonStatus = ({ height, weight }: PokemonStatusProps) => (
  <div className="grid grid-cols-2 gap-2">
    <StatItem type="weight" value={`${convertHectogramsToKilograms(weight)} kg`} />
    <StatItem type="height" value={`${convertDecimetresToMeters(height)} m`} />
  </div>
);
