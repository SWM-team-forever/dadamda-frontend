import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';

interface OtherTemplateProps {
    others: {
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
    }[],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function OtherTemplate({ others, isFetching, setIsFetching, count }: OtherTemplateProps) {
    return (
        <>
            <ScrapListHeader type='기타' count={count} />
            {others.length ? <ExistOtherScrapContainer contents={others} isFetching={isFetching} setIsFetching={setIsFetching} /> : <EmptyScrapContainer />}
        </>
    )
}

export default OtherTemplate;