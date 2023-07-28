import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';

function ListTemplate({ lists }) {
    return (
        <>
            <ScrapListHeader type='전체' count={lists.length} />
            {lists.length ? <ExistOtherScrapContainer contents={lists} /> : <EmptyScrapContainer />}
        </>
    )
}

export default ListTemplate;