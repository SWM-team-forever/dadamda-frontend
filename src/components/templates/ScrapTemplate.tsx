import styled from 'styled-components';

import Overlay from '../atoms/Overlay';
import ScrapCreateModal from '../organisms/ScrapCreateModal';
import theme from '../../assets/styles/theme';
import OtherTemplate from './OtherTemplate';
import IconButton from '../atoms/IconButton';
import fab from '../../assets/icons/fab.png';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL } from '../../secret';
import ListTemplate from './ListTemplate';
import NotReadyTemplate from './NotReadyTemplate';
import ErrorHandler from '../../utility/ErrorHandler';
import ErrorDialogModal from '../organisms/ErrorDialogModal';

interface ScrapTemplateProps {
    type: string,
}

function ScrapTemplate({ type }: ScrapTemplateProps) {
    const [isScrapCreateModalVisible, setIsScrapCreateModalVisible] = useState(false);
    const showScrapCreateModal = () => {
        setIsScrapCreateModalVisible(true);
    }

    function hideScrapCreateModal() {
        setIsScrapCreateModalVisible(false);
    }

    const urlMatching: { [key: string]: string } = {
        'other': GET_OTHER_SCRAP_URL,
        'list': GET_LIST_SCRAP_URL,
        'article': GET_ARTICLE_SCRAP_URL,
        'product': GET_PRODUCT_SCRAP_URL,
        'video': GET_PRODUCT_SCRAP_URL,
    }
    const token = localStorage.getItem('token');
    const size = 10;
    const [types, setTypes] = useState<any[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [pages, setPages] = useState(0);
    const [count, setCount] = useState(0);

    const initiate = () => {
        setTypes([]);
        setIsFetching(true);
        setHasNextPage(true);
        setPages(0);
        setCount(0);
    }

    const fetchDatas = useCallback(async () => {
        const url = urlMatching[type] + `?page=${pages}&size=${size}`;
        token &&
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }).then((response) => response.json())
                .then((data) => {
                    setTypes([...types, ...data.data.content]);
                    setPages(data.data.pageable.pageNumber + 1);
                    setHasNextPage(!data.data.last);
                })
                .catch(err => console.error(err));
        setIsFetching(false);
    }, [pages, types, type]);

    const [error, setError] = useState(null);

    const fetchScrapCount = () => {
        const url = urlMatching[type] + `/count`;
        token &&
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }).then((response) => response.json())
                .then((data) => {
                    setCount(data.data.count);
                })
                .catch(err => console.error(err));
    }

    useEffect(() => {
        initiate();
        fetchScrapCount();
    }, [type]);

    useEffect(() => {
        if (isFetching && hasNextPage) {
            fetchDatas();
        } else if (!hasNextPage) {
            setIsFetching(false);
        }
    }, [isFetching]);

    return (
        <>
            {error && <ErrorHandler error={error} setError={setError} />}
            <ScrapListContainer>
                {type === 'other' && <OtherTemplate others={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {type === 'list' && <ListTemplate lists={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {(type !== 'other' && type !== 'list') && <NotReadyTemplate />}
                <IconButton
                    src={fab}
                    style={{
                        position: 'fixed',
                        bottom: '15px',
                        right: '15px',
                        width: '48px',
                        height: '48px',
                    }}
                    onClick={showScrapCreateModal}
                />
                {isScrapCreateModalVisible &&
                    <Overlay>
                        <ScrapCreateModal hideScrapCreateModal={hideScrapCreateModal} setError={setError} />
                    </Overlay>
                }
            </ScrapListContainer>
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 200px);
    height: calc(100% - 50px);
    background-color: ${theme.color.background_color};
    position: fixed;
    right: 0;
    top: 50px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
`

export default ScrapTemplate;
