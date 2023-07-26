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

export const defaultTooltip: Story ={
    args: {
        contents: [{
        name: '프로필 정보',
        link: '/user',
        onClick: () => console.log("hi"),
    }, {
        name: '로그아웃',
        link: '/main',
        onClick: () => console.log("hi"),
    }]
    }
}


interface TooltipProps {
    contents: {
        link?: string,
        onClick: () => void,
        name: string,
    }[]
}