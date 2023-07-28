import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import ExistListScrapContainer from '../organisms/ExistListScrapContainer';

function ListTemplate({ lists }) {
    return (
        <>
            <ScrapListHeader type='전체' count={lists.length} />
            {lists.length ? <ExistListScrapContainer contents={lists} /> : <EmptyScrapContainer />}
        </>
    )
}

export default ListTemplate;