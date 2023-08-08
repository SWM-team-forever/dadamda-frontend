import type { Meta, StoryObj } from '@storybook/react';

import VideoScrapCard from '../components/molcules/VideoScrapCard';

const meta: Meta<typeof VideoScrapCard> = {
  title: 'Organisms/VideoScrapCard',
  component: VideoScrapCard,
};

export default meta;
type Story = StoryObj<typeof VideoScrapCard>;

export const DefaultStyle: Story = {
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
    siteName: 'YOUTUBE',
    channelImageUrl: 'https://yt3.ggpht.com/hkRZlmV18W3wm8DlqOZaQHe-g-h8ugcsIdeSk6ZpCOyhOXf1ReGTseiNi8ek92Waosv4r32G=s88-c-k-c0x00ffffff-no-rj',
    channelName: 'You, Me and Automation',
    embedUrl: 'https://www.youtube.com/embed/Jyh8pVWQ8sU',
    playTime: '6:08',
    watchedCnt: '2.2천회',
    publishedDate: '1년 전',
    dtype: 'video',
    }
  }
};