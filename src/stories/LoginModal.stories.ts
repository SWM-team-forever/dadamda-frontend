import type { Meta, StoryObj } from '@storybook/react';
import LoginModal from '../components/organisms/LoginModal';

const meta= {
    title: 'Organisms/Modal',
    component: LoginModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof LoginModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story ={

}