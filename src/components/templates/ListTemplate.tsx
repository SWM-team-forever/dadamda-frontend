import { useEffect } from 'react';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import ExistListScrapContainer from '../organisms/ExistListScrapContainer';

interface ListTemplateProps {
    lists: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailUrl: string,
        scrapCreatedDate: string,
        scrapId: number,
        memoList: [{
            memoId: number,
            memoImageURL?: string,
            memoText?: string,
        }],
        siteName: string,
        author: string,
        authorImageUrl: string,
        blogName: string,
        publishedDate: string,
        price: string,
        channelImageUrl: string,
        channelName: string,
        embedUrl: string,
        genre: string,
        playTime: string,
        watchedCnt: string,
        dtype: string,
    }[],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function ListTemplate({ lists, isFetching, setIsFetching, count }: ListTemplateProps) {

    return (
        <>
            <ScrapListHeader type='전체' count={count} />
            {lists.length ? <ExistListScrapContainer contents={lists} isFetching={isFetching} setIsFetching={setIsFetching} /> : <EmptyScrapContainer />}
        </>
    )
}

export default ListTemplate;