import type { Meta, StoryObj } from '@storybook/react';
import ScrapEditModal from '../components/organisms/ScrapEditModal';

const meta= {
    title: 'Organisms/ScrapEditModal',
    component: ScrapEditModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ScrapEditModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultVersion: Story ={

}