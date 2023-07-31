import type { Meta, StoryObj } from '@storybook/react';

import Button from '../components/atoms/DefaultButton';
import icon from '../assets/icons/AddIcon.png';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    buttonStyle: 'primary',
    label: 'Button',
    isRound: true,
  },
};

export const Secondary: Story = {
  args: {
    buttonStyle: 'secondary',
    label: 'Button',
  },
};

export const Gray: Story = {
  args: {
    buttonStyle: 'gray',
      label: 'Button',
    },
};

export const TextOnly: Story = {
  args: {
      buttonStyle: 'text-only',
    label: 'Button',
  },
}

export const IconButton: Story = {
  args: {
    buttonStyle: 'gray',
    label: 'Button',
    startIcon: icon,
    size: 'small',
  }
}

