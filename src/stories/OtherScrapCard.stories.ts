import type { Meta, StoryObj } from '@storybook/react';

import OtherScrapCard from '../components/molcules/OtherScrapCard';

const meta: Meta<typeof OtherScrapCard> = {
  title: 'Organisms/OtherScrapCard',
  component: OtherScrapCard,
};

export default meta;
type Story = StoryObj<typeof OtherScrapCard>;

export const Primary: Story = {
  args: {
    content: {
        pageUrl: 'www.tistory.com/123',
        title: '홍길동이 추천하는 맛집1',
        description: '고기 맛집을 위주로 하고 있습니다.',
        thumbnailURL: 'https://lh3.googleusercontent.com/-TOE8rYMLSEY/AAAAAAAAAAI/AAAAAAAAANc/TLiDjKKULqo/photo.jpg?sz=128',
        scrapCreatedDate: '2023/03/23'
    }
  }
};