import type { Meta, StoryObj } from '@storybook/react';
import Memo from '../components/molcules/Memo';

const meta= {
    title: 'Molcules/Memo',
    component: Memo,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Memo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const imageMemo: Story ={
    args: {
        imageSource: 'https://tistory1.daumcdn.net/tistory/4967051/attach/61cc19160f034aa38a594ac39aa720e2',
    },
}

export const textMemo: Story = {
    args: {
        textContent: '시승을 원하는 렉서스 모델과 가까운 렉서스 공식 전시장을 확인하세요. 렉서스 공식 홈페이지에서 간편하게 시승신청을 하실 수 있습니다.시승을 원하는 렉서스 모델과 가까운 렉서스 공식 전시장을 확인하세요. 렉서스 공식 홈페이지에서 간편하게 시승신청을 하실 수 있습니다.',
    },
}