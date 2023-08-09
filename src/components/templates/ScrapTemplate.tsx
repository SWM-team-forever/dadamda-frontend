import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import NotReadyTemplate from './NotReadyTemplate';
import OtherTemplate from './OtherTemplate';
import ListTemplate from './ListTemplate';
import ScrapCreateModal from '../organisms/ScrapCreateModal';
import Overlay from '../atoms/Overlay';
import IconButton from '../atoms/IconButton';

import ErrorHandler from '../../utility/ErrorHandler';
import fab from '../../assets/icons/fab.png';
import theme from '../../assets/styles/theme';
import { GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL } from '../../secret';

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

    // const definedErrors = ['BR001', 'BR002', 'NF000', 'NF001', 'NF002', 'NF003', 'IS000'];
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
            }).then((response) => {
                // if (response.json().body) {
                //     throw new Error('UNDEFINED_ERROR');
                // }
                // console.log('body', response.json());
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
                .then((data) => {
                    setTypes([...types, ...data.data.content]);
                    setPages(data.data.pageable.pageNumber + 1);
                    setHasNextPage(!data.data.last);
                })
                .catch(err => setError(err.message));
        setIsFetching(false);
    }, [pages, types, type]);

    const [error, setError] = useState<string | null>(null);

    const fetchScrapCount = () => {
        const url = urlMatching[type] + `/count`;
        console.log('token', token);
        token &&
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }).then((response) => {
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
                .then((data) => {
                    setCount(data.data.count);
                })
                .catch(err => setError(err.message));
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
