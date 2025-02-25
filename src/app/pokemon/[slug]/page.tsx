'use client';

import { usePokemonById } from '@/hooks/getPokemon';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const { data: pokemon, isLoading, error } = usePokemonById(slug as unknown as number);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar Pokémon.</p>;

  return (
    <div>
      <h2>{pokemon?.name}</h2>
      <img src={pokemon?.sprite} alt={pokemon?.name} />
      <p>Altura: {pokemon?.height}</p>
      <p>Peso: {pokemon?.weight}</p>
      <p>Tipos: {pokemon?.types.join(', ')}</p>
      <p>Fraquezas: {pokemon?.weaknesses.join(', ')}</p>
    </div>
  );
}
