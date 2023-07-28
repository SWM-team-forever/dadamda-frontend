import type { Meta, StoryObj } from '@storybook/react';

import ProductScrapCard from '../components/molcules/ProductScrapCard';

const meta: Meta<typeof ProductScrapCard> = {
  title: 'Organisms/ProductScrapCard',
  component: ProductScrapCard,
};

export default meta;
type Story = StoryObj<typeof ProductScrapCard>;

export const DefaultStyle: Story = {
  args: {
    content: {
      pageUrl: "https://developer.mozilla.org/ko/docs/Web/CSS/height",
      title: "제트스킨 변색없는 투명 나노슬림 아이폰 케이스",
      description: "시승을 원하는 렉서스 모델과 가까운 렉서스 공식 전시장을 확인하세요. 렉서스 공식 홈페이지에서 간편하게 시승신청을 하실 수 있습니다.",
      thumbnailUrl: "https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png",
      scrapId: 1,
      memoList: [{
        memoId: 1,
        memoText: "안녕, 안녕"
    }],
    siteName: '쿠팡',
    price: '9800원',
    }
  }
};