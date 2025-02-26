import { Footer } from '@/components/atoms/Footer';
import { PokemonList } from '@/components/molecules/PokemonList';

export default function Home() {
  return (
    <>
      <main className="items-center bg-gray-700 justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-2xl font-bold my-4">Pokédex</h1>
          <PokemonList />
        </div>
      </main>
      <Footer />
    </>
  );
}
