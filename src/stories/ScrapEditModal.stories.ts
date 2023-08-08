import type { Meta, StoryObj } from '@storybook/react';
import ScrapEditModal from '../components/organisms/ScrapEditModal';

const meta= {
    title: 'Organisms/ScrapEditModal',
    component: ScrapEditModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ScrapEditModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultScrapEditModal:Story = {
    args: {
        content: {
            price: '150만원',
            siteName: '11번가',
            title: "[11번가] [행사~08/06]한샘 인생키친 슬림+무료철거/무료1DAY시공/싱크대/주방/부엌",
            memoList: [{
                memoId: 29,
                memoText: "ㅇㅇㅇㅇㅇㅇㅇㅇㅇ올쟈덜",
            },
            {
                memoId: 30,
                memoImageUrl: 'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/dl/v2/6/4/9/6/6/1/hggNr/2066649661_148653812.jpg',
            },
            ],
            scrapId: 0,
            pageUrl: 'www.naver.com',
            thumbnailUrl: '',
            dtype: 'product',

        }
    }
}