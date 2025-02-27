'use client';

import { useImageColors } from '@/hooks/useImageColors';
import { usePokemonDetails } from '@/hooks/usePokemonDetails';
import clsx from 'clsx';
import Image from 'next/image';

import { Loader } from '@/components/atoms/Loader';
import { Pagination } from '@/components/atoms/Pagination';
import { PokeBadge } from '@/components/atoms/PokeBadge';
import { StatsPill } from '@/components/atoms/StatsPill';
import { PokemonProps } from '@/components/organisms/PokeCard';

export type PokemonDetailsProps = {
  totalPages: number;
} & Pick<
  PokemonProps,
  | 'sprites'
  | 'types'
  | 'baseStats'
  | 'height'
  | 'weight'
  | 'id'
  | 'name'
  | 'japaneseName'
  | 'region'
>;

export const PokemonDetails = ({
  baseStats,
  height,
  id,
  name,
  region,
  sprites,
  types,
  weight,
  japaneseName,
  totalPages
}: PokemonDetailsProps) => {
  const { isLoading } = useImageColors(sprites.front_default);
  const { pokemon, isFetching, goToPage, currentPage } = usePokemonDetails();

  if (isFetching || !pokemon) return <Loader />;

  return (
    <>
      {isLoading && <Loader />}
      <section className="max-w-7xl mx-auto px-4 flex flex-col gap-4 justify-center min-h-screen flex-grow  ">
        <section className="flex flex-col gap-1">
          <p className="text-lg font-bold">{`#${id}`}</p>
          <h1 className="text-4xl font-bold capitalize">{name}</h1>
        </section>
        <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col">
          <section className="flex w-[90%] flex-col lg:flex-row justify-between w-full gap-4">
            {/* Region */}
            <div className="w-full lg:w-[10%] flex-shrink-0 flex self-center">
              <p className="lg:-rotate-90 text-nowrap">Region: {region}</p>
            </div>

            {/* Image and Infos */}
            <div className="w-full lg:w-[60%] flex-shrink-0 relative flex flex-col lg:flex-row items-center lg:items-start">
              <span className="font-bold opacity-20 text-9xl absolute lg:top-0 hidden lg:block">
                {japaneseName}
              </span>

              <div className="flex flex-col mt-4 self-start lg:self-center lg:mt-0 lg:ml-8">
                <span className="flex gap-2">
                  <strong>Height:</strong>
                  <p>{`${height / 10}m`}</p>
                </span>
                <span className="flex gap-2">
                  <strong>Weight:</strong>
                  <p>{`${weight / 10}kg`}</p>
                </span>
              </div>

              <Image
                className="place-self-center z-10 relative"
                src={sprites.front_default}
                alt={name}
                width={400}
                height={400}
              />

              <span className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-center opacity-20 text-9xl absolute  block lg:hidden">
                {japaneseName}
              </span>
            </div>

            {/* Types and Base Stats */}
            <div className="w-full lg:w-[25%] flex flex-col flex-shrink-0 gap-4">
              <div className="flex gap-2 flex-wrap">
                {types.map((type) => (
                  <PokeBadge
                    key={type}
                    className="p-4 rounded-full transition hover:scale-110"
                    badgeType="list"
                    type={type}
                  />
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold drop-shadow-2xl">Base Stats:</h2>
                <div className="flex flex-wrap gap-2 border-l-4 border-white/40 px-4">
                  <StatsPill title={`HP: ${baseStats.hp}`} />
                  <StatsPill title={`Attack: ${baseStats.attack}`} />
                  <StatsPill title={`Defense: ${baseStats.defense}`} />
                  <StatsPill title={`SP. Attack: ${baseStats.specialAttack}`} />
                  <StatsPill title={`SP. Defense: ${baseStats.specialDefense}`} />
                  <StatsPill title={`Speed: ${baseStats.speed}`} />
                </div>
              </div>
            </div>
          </section>
          <div
            className={clsx(
              'w-fit flex justify-center self-center',
              'md:flex-row lg:flex-col lg:absolute lg:top-0 lg:right-0'
            )}
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={goToPage}
              isFetching={false}
            />
          </div>
        </div>
      </section>
    </>
  );
};
