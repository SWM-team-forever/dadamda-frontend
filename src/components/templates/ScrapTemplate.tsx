import { useEffect, useState } from 'react';
import styled from 'styled-components';

import NotReadyTemplate from './NotReadyTemplate';

import { GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL } from '../../secret';
import ScrapListHeader from '@/components/molcules/ScrapListHeader';
import ColumnListTemplate from '@/components/templates/ColumnListTemplate';
import MasonryListTemplate from '@/components/templates/MasonryListTemplate';
import { Box } from '@mui/material';

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
    const [count, setCount] = useState(0);

    const initiate = () => {
        setCount(0);
    }

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

    const providingTemplates = ['other', 'list', 'video', 'product', 'article'];
    const masonryTemplates = ['other', 'list'];
    const typeMatching = {
        'other': '기타',
        'list': '전체',
        'video': '영상',
        'product': '상품',
        'article': '아티클',
    }

    return (
        <>
            <ScrapListContainer>
                <ScrapListHeader type={typeMatching[type as keyof typeof typeMatching]} count={count} />
                <Box
                    sx={{
                        height: 'calc(100% - 145px)',
                    }}
                >
                    {count === 0 && <NotReadyTemplate />}
                    {masonryTemplates.includes(type) && <MasonryListTemplate type={type} />}
                    {!masonryTemplates.includes(type) && <ColumnListTemplate type={type} />}
                    {!providingTemplates.includes(type) && <NotReadyTemplate />}
                </Box>
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
