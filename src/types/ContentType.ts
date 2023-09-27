export interface contentProps {
    content: {
        pageUrl: string,
        title?: string,
        description?: string,
        thumbnailUrl?: string,
        scrapCreatedDate?: string,
        scrapId: number,
        memoList: {
            memoId: number,
            memoImageUrl?: string,
            memoText?: string,
            createdDate: number,
        }[],
        siteName?: string,
        author?: string,
        authorImageUrl?: string,
        blogName?: string,
        publishedDate?: number,
        price?: string,
        channelImageUrl?: string,
        channelName?: string,
        embedUrl?: string,
        genre?: string,
        playTime?: string,
        watchedCnt?: string,
        dtype: string,
    }
}