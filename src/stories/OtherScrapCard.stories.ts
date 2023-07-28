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
      pageUrl: "https://developer.mozilla.org/ko/docs/Web/CSS/height",
      title: "height - CSS: Cascading Style Sheets | MDN",
      description: "height CSS 속성은 요소의 높이를 지정합니다. 기본값은 콘텐츠 영역의 높이지만, box-sizing이 border-box라면 테두리 영역의 높이를 설정합니다.",
      thumbnailUrl: "https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png",
      scrapId: 1,
      memoList: [{
        memoId: 1,
        memoText: "안녕, 안녕"
    }],
    }
  }
};