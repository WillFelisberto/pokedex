import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Pokémon Not Found!',
  description: 'Oops! Your Pokémon has escaped. Try searching again or go back home.',
  openGraph: {
    title: '404 - Pokémon Not Found!',
    description: 'Oops! Your Pokémon has escaped. Try searching again or go back home.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/404`,
    siteName: 'Pokédex',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/pokedex.png`,
        width: 1200,
        height: 630,
        alt: 'Pokémon Not Found - 404 Error'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 - Pokémon Not Found!',
    description: 'Oops! Your Pokémon has escaped. Try searching again or go back home.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/pokedex.png`]
  }
};
export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#fee24d]">
      <h1 className="text-9xl font-extrabold text-[#3961dc] tracking-widest">404</h1>
      <div className="bg-[#3961dc] px-2 text-sm rounded rotate-12 absolute">
        Your Pokemon has escaped!
      </div>

      <button className="mt-5">
        <Link
          href="/"
          className="relative inline-block text-sm font-medium text-[#3961dc] group active:text-orange-500 focus:outline-none focus:ring"
        >
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#3961dc] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#fee24d] border border-current">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
}
