import { useEffect, useState } from 'react';
import styled from 'styled-components';

import NotReadyTemplate from './NotReadyTemplate';

import { GET_ARTICLE_SCRAP_URL, GET_LIST_SCRAP_URL, GET_OTHER_SCRAP_URL, GET_PRODUCT_SCRAP_URL, GET_VIDEO_SCRAP_URL } from '../../secret';
import ScrapListHeader from '@/components/molcules/ScrapListHeader';
import ColumnListTemplate from '@/components/templates/ColumnListTemplate';
import MasonryListTemplate from '@/components/templates/MasonryListTemplate';
import { Box, CircularProgress } from '@mui/material';
import EmptyScrapContainer from '@/components/organisms/EmptyScrapContainer';
import MatchTemplateWithTypeAndCount from '@/components/templates/MatchTemplateWithTypeAndCount';
import { useQuery } from '@tanstack/react-query';
import { useGetScrapCount } from '@/api/count';
import BoardListHeader from '@/components/molcules/BoardListHeader';
import theme from '@/assets/styles/theme';

function BoardListTemplate() {
    const token = localStorage.getItem('token');

    // const { data, isLoading, isFetched } = useQuery(['boardCount'],
    //     () => {
    //         return providingTemplates.includes(type)
    //             ? (token && useGetScrapCount({ type: type, token: token }))
    //             : { data: { count: 0 } };
    //     },
    //     {
    //         enabled: !!token,
    //         refetchOnWindowFocus: false,
    //         select: (data) => {
    //             return data?.data.count;
    //         }
    //     }
    // );

    // if (isLoading) {
    //     return <CircularProgress
    //         sx={{
    //             position: 'absolute',
    //             top: '50%',
    //             left: '50%',
    //             transform: 'translate(-50%, -50%)',
    //         }} />;
    // }

    return (
        <>
            <ScrapListContainer>
                <BoardListHeader count={1} />
                <Box
                    sx={{
                        height: 'calc(100% - 145px)',
                    }}
                >
                    {/* <MatchTemplateWithTypeAndCount type={type} count={data} /> */}
                    <Box
                        sx={{
                            width: '320px',
                            height: '180px',
                            backgroundColor: theme.color.Blue_090,
                        }}
                    >
                        보드 1
                    </Box>
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

export default BoardListTemplate;
