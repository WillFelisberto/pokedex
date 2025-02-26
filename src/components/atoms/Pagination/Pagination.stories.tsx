import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Atoms/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    totalPages: { control: { type: 'number', min: 1 } },
    isFetching: { control: 'boolean' },
    goToPage: { action: 'goToPage' }
  },
  args: {
    currentPage: 3,
    totalPages: 10,
    isFetching: false
  }
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};

export const Fetching: Story = {
  args: {
    isFetching: true
  }
};

export const FirstPage: Story = {
  args: {
    currentPage: 1
  }
};

export const LastPage: Story = {
  args: {
    currentPage: 10
  }
};
