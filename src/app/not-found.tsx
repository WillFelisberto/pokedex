import Link from 'next/link';

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
