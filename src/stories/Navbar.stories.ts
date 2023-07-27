import type { Meta, StoryObj } from '@storybook/react';

import Navbar from '../components/molcules/Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Molcules/Navbar',
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {

  }
};