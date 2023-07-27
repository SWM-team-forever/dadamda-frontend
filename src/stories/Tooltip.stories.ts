import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from '../components/atoms/Tooltip';

const meta= {
    title: 'ATOMS/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;


interface TooltipProps {
    contents: {
        link?: string,
        onClick: () => void,
        name: string,
    }[]
}