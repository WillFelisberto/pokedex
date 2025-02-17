import tailwindScrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    'bg-pokemon-normal',
    'bg-pokemon-fire',
    'bg-pokemon-water',
    'bg-pokemon-electric',
    'bg-pokemon-grass',
    'bg-pokemon-ice',
    'bg-pokemon-fighting',
    'bg-pokemon-poison',
    'bg-pokemon-ground',
    'bg-pokemon-flying',
    'bg-pokemon-psychic',
    'bg-pokemon-bug',
    'bg-pokemon-rock',
    'bg-pokemon-ghost',
    'bg-pokemon-dragon',
    'bg-pokemon-dark',
    'bg-pokemon-steel',
    'bg-pokemon-fairy'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        pokemon: {
          normal: 'var(--pokemon-normal)',
          fire: 'var(--pokemon-fire)',
          water: 'var(--pokemon-water)',
          electric: 'var(--pokemon-electric)',
          grass: 'var(--pokemon-grass)',
          ice: 'var(--pokemon-ice)',
          fighting: 'var(--pokemon-fighting)',
          poison: 'var(--pokemon-poison)',
          ground: 'var(--pokemon-ground)',
          flying: 'var(--pokemon-flying)',
          psychic: 'var(--pokemon-psychic)',
          bug: 'var(--pokemon-bug)',
          rock: 'var(--pokemon-rock)',
          ghost: 'var(--pokemon-ghost)',
          dragon: 'var(--pokemon-dragon)',
          dark: 'var(--pokemon-dark)',
          steel: 'var(--pokemon-steel)',
          fairy: 'var(--pokemon-fairy)'
        }
      }
    },
    plugins: [tailwindScrollbar]
  }
} satisfies Config;
