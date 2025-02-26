import Image from 'next/image';

interface LoaderProps {
  fullScreen?: boolean;
}

export const Loader = ({ fullScreen = true }: LoaderProps) => (
  <div
    className={`flex justify-center items-center ${
      fullScreen ? 'fixed top-0 left-0 w-screen h-screen bg-red-600 z-50' : ''
    }`}
  >
    <div className="w-24 h-24">
      {/* Pokébola girando */}
      <Image
        src="/pokeball.svg"
        width={100}
        height={100}
        alt="Loading..."
        className="w-full h-full animate-spin"
      />
    </div>
  </div>
);
