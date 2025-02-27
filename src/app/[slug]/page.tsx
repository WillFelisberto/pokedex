import { Metadata } from 'next';
import { Suspense } from 'react';

import { Loader } from '@/components/atoms/Loader/Loader';
import { PokemonDetails } from '@/components/templates/PokemonDetails';

import { fetchPokemonById } from '@/lib/api/pokemon';
import { formatPokemonId } from '@/lib/utils/StatusConvert';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const pokemon = await fetchPokemonById(slug);

  return {
    title: `Pokédex | ${pokemon.name} (#${formatPokemonId(pokemon.id)})`,
    description: `Detalhes completos sobre ${pokemon.name}, incluindo tipo, estatísticas e região na Pokédex.`,
    openGraph: {
      title: `Pokédex | ${pokemon.name}`,
      description: `Explore informações detalhadas sobre ${pokemon.name}, incluindo estatísticas e habilidades.`,
      images: [{ url: pokemon.sprites.front_default, width: 400, height: 400 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `Pokédex | ${pokemon.name}`,
      description: `Descubra as estatísticas de ${pokemon.name} na Pokédex.`,
      images: [pokemon.sprites.front_default]
    },
    icons: {
      icon: pokemon.sprites.front_default
    }
  };
}

export default async function PokemonDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pokemon = await fetchPokemonById(slug);
  const response = await fetch(`${process.env.NEXT_PUBLIC_POKEAPI_URL}/pokemon?limit=1`);
  const data = await response.json();
  const totalPages = data.count;

  return (
    <Suspense fallback={<Loader />}>
      <PokemonDetails totalPages={totalPages} {...pokemon} />
    </Suspense>
  );
}
