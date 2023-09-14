import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import NotReadyTemplate from './NotReadyTemplate';
import OtherTemplate from './OtherTemplate';
import ListTemplate from './ListTemplate';

import { GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL } from '../../secret';
import VideoTemplate from './VideoTemplate';
import ArticleTemplate from './ArticleTemplate';
import ProductTemplate from './ProductTemplate';

interface ScrapTemplateProps {
    type: string,
}

function ScrapTemplate({ type }: ScrapTemplateProps) {
    const urlMatching: { [key: string]: string } = {
        'other': GET_OTHER_SCRAP_URL,
        'list': GET_LIST_SCRAP_URL,
        'article': GET_ARTICLE_SCRAP_URL,
        'product': GET_PRODUCT_SCRAP_URL,
        'video': GET_VIDEO_SCRAP_URL,
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
                    setTypes([...types, ...data.data.content]);
                    setPages(data.data.pageable.pageNumber + 1);
                    setHasNextPage(!data.data.last);
                })
                .catch(err => { throw new Error(err) });
        setIsFetching(false);
    }, [pages, types, type]);

    const fetchScrapCount = () => {
        const url = urlMatching[type] + `/count`;
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
                .catch(err => { throw new Error(err) });
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

    const providingTemplates = ['other', 'list', 'video', 'product', 'article'];

    return (
        <>
            <ScrapListContainer>
                {type === 'other' && <OtherTemplate others={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {type === 'list' && <ListTemplate lists={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {type === 'video' && <VideoTemplate videos={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {type === 'product' && <ProductTemplate products={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {type === 'article' && <ArticleTemplate videos={types} isFetching={isFetching} setIsFetching={setIsFetching} count={count} />}
                {!providingTemplates.includes(type) && <NotReadyTemplate />}
            </ScrapListContainer>
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 209px);
    height: calc(100% - 56px);
    background-color: linear-gradient(114deg, #EBEEF3 12.12%, #D6DEEA 100%);
    position: fixed;
    right: 0;
    top: 56px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
`

export default ScrapTemplate;
