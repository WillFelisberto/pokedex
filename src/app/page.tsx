import { Metadata } from 'next';
import { Suspense } from 'react';

import { Footer } from '@/components/atoms/Footer';
import { Header } from '@/components/atoms/Header';
import { Loader } from '@/components/atoms/Loader';
import { PokemonList } from '@/components/molecules/PokemonList';

import { env } from '@/lib/env';

const siteUrl = env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  title: 'Pokédex - Explore All Pokémon!',
  description: 'Discover all Pokémon with detailed stats, evolutions, and more!',
  openGraph: {
    title: 'Pokédex - Find Every Pokémon',
    description: 'Get detailed information on every Pokémon in our Pokédex!',
    url: siteUrl,
    siteName: 'Pokédex',
    images: [
      {
        url: `${siteUrl}/pokedex.png`,
        width: 1200,
        height: 630,
        alt: 'Pokédex - Find Every Pokémon'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokédex - Explore All Pokémon!',
    description: 'Find stats, weaknesses, evolutions, and more for every Pokémon.',
    images: [`${siteUrl}/pokedex.png`]
  }
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="items-center bg-gray-200 justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Suspense fallback={<Loader fullScreen={false} />}>
            <PokemonList />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
