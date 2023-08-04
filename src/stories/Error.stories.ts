import type { Meta, StoryObj } from '@storybook/react';

import ErrorDialogModal from '../components/organisms/ErrorDialogModal';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'utils/Error',
  component: ErrorDialogModal,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorDialogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    error: {
                title: '오류 발생',
                content: '오류가 발생하였습니다. 다시 로그인해주세요.',
                action: '로그인하기',
            },
            onClick: () => {
                localStorage.removeItem('token');
                // navigate('/main');
            }
  },
};