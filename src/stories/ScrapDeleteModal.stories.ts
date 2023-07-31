import type { Meta, StoryObj } from '@storybook/react';
import ScrapDeleteModal from '../components/organisms/ScrapDeleteModal';

const meta= {
    title: 'Organisms/ScrapDeleteModal',
    component: ScrapDeleteModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ScrapDeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;
