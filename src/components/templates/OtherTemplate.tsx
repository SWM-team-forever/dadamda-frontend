import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';

function OtherTemplate({ others }) {
    return (
        <>
            <ScrapListHeader type='기타' count={others.length} />
            {others.length ? <ExistOtherScrapContainer contents={others} /> : <EmptyScrapContainer />}
        </>
    )
}

export default OtherTemplate;