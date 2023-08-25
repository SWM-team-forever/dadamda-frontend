import { useEffect } from 'react';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import ExistListScrapContainer from '../organisms/ExistListScrapContainer';
import { contentProps } from '../../types/ContentType';

interface ListTemplateProps {
    lists: contentProps['content'][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function ListTemplate({ lists, count }: ListTemplateProps) {

    return (
        <>
            <ScrapListHeader type='전체' count={count} />
            {lists.length ? <ExistListScrapContainer /> : <EmptyScrapContainer />}
        </>
    )
}

export default ListTemplate;