// src/__mocks__/next/navigation.ts
export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  back: jest.fn(),
  forward: jest.fn()
});

export const useSearchParams = () => new URLSearchParams();
export const usePathname = () => '/';
