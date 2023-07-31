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
}

function ListTemplate({ lists }: ListTemplateProps) {
    return (
        <>
            <ScrapListHeader type='전체' count={lists.length} />
            {lists.length ? <ExistListScrapContainer contents={lists} /> : <EmptyScrapContainer />}
        </>
    )
}

export default ListTemplate;