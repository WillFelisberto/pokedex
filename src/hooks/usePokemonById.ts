/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_POKEAPI_URL;

const generationToRegionMap: Record<string, string> = {
  'generation-i': 'Kanto',
  'generation-ii': 'Johto',
  'generation-iii': 'Hoenn',
  'generation-iv': 'Sinnoh',
  'generation-v': 'Unova',
  'generation-vi': 'Kalos',
  'generation-vii': 'Alola',
  'generation-viii': 'Galar',
  'generation-ix': 'Paldea'
};

const getIdFromSpeciesUrl = (url: string): number => {
  const parts = url.split('/');

  return parseInt(parts[parts.length - 2], 10);
};

const getPokemonDetailsById = async (id: number) => {
  const res = await fetch(`${API_URL}/pokemon/${id}`);
  const details = await res.json();

  return {
    id: details.id,
    name: details.name,
    weight: details.weight,
    height: details.height,
    sprite: details.sprites.other['official-artwork'].front_default,
    evolutionSprite: details.sprites.front_default,
    types: details.types.map((t: any) => t.type.name),
    abilities: details.abilities.map((a: any) => ({
      name: a.ability.name,
      is_hidden: a.is_hidden
    })),
    speciesUrl: details.species.url,
    stats: details.stats
  };
};

const processEvolutionNode = async (
  node: any,
  evolutionLevel: number | null = null
): Promise<
  Array<{
    id: number;
    name: string;
    sprite: string;
    types: string[];
    level: number | null;
  }>
> => {
  const id = getIdFromSpeciesUrl(node.species.url);
  const details = await getPokemonDetailsById(id);

  const currentEvolution = {
    id: details.id,
    name: node.species.name,
    sprite: details.evolutionSprite,
    types: details.types,
    level: evolutionLevel
  };

  let evolutions = [currentEvolution];

  for (const child of node.evolves_to) {
    const childEvolutionLevel = child.evolution_details?.[0]?.min_level ?? null;
    const childEvolutions = await processEvolutionNode(child, childEvolutionLevel);
    evolutions = evolutions.concat(childEvolutions);
  }

  return evolutions;
};

const fetchPokemonById = async (id: number) => {
  const details = await getPokemonDetailsById(id);

  // Buscar fraquezas
  const weaknessesRes = await fetch(`${API_URL}/type/${details.types[0]}`);
  const weaknessesData = await weaknessesRes.json();
  const weaknesses = weaknessesData.damage_relations.double_damage_from.map((w: any) => w.name);

  // Buscar informações de evolução
  const speciesRes = await fetch(details.speciesUrl);
  const speciesData = await speciesRes.json();

  // Pegando o nome em japonês da lista de nomes
  const japaneseNameEntry = speciesData.names.find((n: any) => n.language.name === 'ja');
  const japaneseName = japaneseNameEntry ? japaneseNameEntry.name : 'Desconhecido';

  // Identificando a geração e mapeando para a região correspondente
  const generationName = speciesData.generation.name;
  const region = generationToRegionMap[generationName] || 'Desconhecida';

  // Pegando os base stats
  const baseStats = {
    hp: details.stats.find((s: any) => s.stat.name === 'hp')?.base_stat || 0,
    attack: details.stats.find((s: any) => s.stat.name === 'attack')?.base_stat || 0,
    defense: details.stats.find((s: any) => s.stat.name === 'defense')?.base_stat || 0,
    specialAttack: details.stats.find((s: any) => s.stat.name === 'special-attack')?.base_stat || 0,
    specialDefense:
      details.stats.find((s: any) => s.stat.name === 'special-defense')?.base_stat || 0,
    speed: details.stats.find((s: any) => s.stat.name === 'speed')?.base_stat || 0
  };

  const evolutionRes = await fetch(speciesData.evolution_chain.url);
  const evolutionData = await evolutionRes.json();

  const evolutionChain = await processEvolutionNode(evolutionData.chain);

  // Buscar distribuição de gênero
  const genderRes = await fetch(`${API_URL}/pokemon-species/${details.id}/`);
  const genderData = await genderRes.json();
  const maleRatio = 100 - genderData.gender_rate * 12.5;
  const femaleRatio = genderData.gender_rate * 12.5;

  return {
    id: details.id,
    name: details.name,
    japaneseName, // Adicionando nome japonês
    region,
    baseStats,
    weight: details.weight,
    height: details.height,
    sprite: details.sprite,
    types: details.types,
    weaknesses,
    evolutions: evolutionChain,
    abilities: details.abilities,
    genderRatio: {
      male: maleRatio,
      female: femaleRatio
    }
  };
};

export const usePokemonById = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById(id),
    enabled: !!id // Só busca quando ID for válido
  });
};
