import type { Meta, StoryObj } from '@storybook/react';
import MemoCreateModal from '../components/organisms/MemoCreateModal';

const meta= {
    title: 'Organisms/MemoCreateModal',
    component: MemoCreateModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof MemoCreateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story ={

}