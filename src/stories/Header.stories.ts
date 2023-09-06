import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/molcules/Navigation/Header';

const meta = {
  title: 'Molcules/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    size: 'large',
  },
};

export const LoggedOut: Story = {
  args: {
    size: 'large',
  }
};

export const Small: Story = {
  args: {
    size: 'small',
  }
}

export const Large: Story = {
  args: {
    size: 'large'
  }
}
