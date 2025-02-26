export const useImageColors = (_imageUrl: string) => {
  return {
    isLoading: false, // Pode ser alterado no Storybook
    colors: {
      vibrant: '#b45646',
      muted: '#9c8551',
      darkVibrant: '#7e643c',
      darkMuted: '#5b4b31',
      lightVibrant: '#f4d47c',
      lightMuted: '#c1899c'
    }
  };
};
