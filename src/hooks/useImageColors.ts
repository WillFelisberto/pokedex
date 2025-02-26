import { useBackgroundColor } from '@/context/BackgroundColorContext';
import { Vibrant } from 'node-vibrant/browser';
import { useState, useEffect } from 'react';

export const useImageColors = (imageUrl: string) => {
  const { setBackgroundColor } = useBackgroundColor();
  const [colors, setColors] = useState<{
    vibrant?: string;
    muted?: string;
    darkVibrant?: string;
    darkMuted?: string;
    lightVibrant?: string;
    lightMuted?: string;
  }>({});

  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    if (!imageUrl) return;

    const fetchColors = async () => {
      setIsLoading(true); // Inicia o loading antes de buscar as cores
      try {
        const palette = await Vibrant.from(imageUrl).getPalette();
        const extractedColor = palette.DarkMuted?.hex || palette.Muted?.hex || '#ffffff';

        setColors({
          vibrant: palette.Vibrant?.hex,
          muted: palette.Muted?.hex,
          darkVibrant: palette.DarkVibrant?.hex,
          darkMuted: palette.DarkMuted?.hex,
          lightVibrant: palette.LightVibrant?.hex,
          lightMuted: palette.LightMuted?.hex
        });

        setBackgroundColor(extractedColor); // Atualiza o fundo dinamicamente
      } catch (error) {
        console.error('Erro ao extrair cores:', error);
      } finally {
        setIsLoading(false); // Finaliza o loading após a execução
      }
    };

    fetchColors();
  }, [imageUrl, setBackgroundColor]);

  return { colors, isLoading };
};
