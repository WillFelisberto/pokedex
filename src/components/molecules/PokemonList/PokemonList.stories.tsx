import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { PokemonList } from './PokemonList';

const queryClient = new QueryClient();

const meta: Meta<typeof PokemonList> = {
  title: 'Organisms/PokemonList',
  component: PokemonList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Story />
        </div>
      </QueryClientProvider>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof PokemonList>;

export const Default: Story = {};
