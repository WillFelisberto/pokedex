'use client';

import { createContext, useContext, useState } from 'react';

const BackgroundColorContext = createContext({
  backgroundColor: '#ffffff',
  setBackgroundColor: (_color: string) => {}
});

export function BackgroundColorProvider({ children }: { children: React.ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  return (
    <BackgroundColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      <div style={{ backgroundColor, minHeight: '100vh', alignContent: 'center' }}>{children}</div>
    </BackgroundColorContext.Provider>
  );
}

export function useBackgroundColor() {
  return useContext(BackgroundColorContext);
}
