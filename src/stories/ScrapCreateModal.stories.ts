import type { Meta, StoryObj } from '@storybook/react';
import ScrapCreateModal from '../components/organisms/ScrapCreateModal';

const meta= {
    title: 'Organisms/ScrapCreateModal',
    component: ScrapCreateModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ScrapCreateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultVersion: Story ={

}