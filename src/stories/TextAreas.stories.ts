import type { Meta, StoryObj } from '@storybook/react';

import TextArea from '../components/atoms/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const DefaultTextArea: Story = {
    args:{
        labelText: '설명',
        defaultValue: '시승을 원하는 렉서스 모델과 가까운 렉서스 공식 전시장을 확인하세요. 렉서스 공식 홈페이지에서 간편하게 시승신청을 하실 수 있습니다.'
    }
};