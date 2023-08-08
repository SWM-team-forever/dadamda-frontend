import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';

interface OtherTemplateProps {
    others: contentProps['content'][],
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