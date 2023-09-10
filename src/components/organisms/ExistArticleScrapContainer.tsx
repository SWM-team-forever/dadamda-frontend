import { CircularProgress, Card, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import styled from 'styled-components';

import CategoryItemListProvider, { useCategoryItemList } from '@/context/CategoryListContext';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '@/context/CategoryItemContext';
import { useGetArticleScrap } from '@/api/scrap';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import RowContainer from '@/components/atoms/RowContainer';
import MobileArticleListElement from '@/components/molcules/CategoryItem/CategoryScrapList/MobileArticleListElement';
import theme from '@/assets/styles/theme';
import { MoveToPageIcon } from '@/components/atoms/Icon';

function ExistArticleScrapContainer() {
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const token = localStorage.getItem('token');
    const size = 30;
    const [pages, setPages] = useState(0);
    const [, setError] = useState<string | null>(null);

    const onSuccess = useCallback((data: any) => {
        setCategoryItemList(data);
        setSelectedContent(data[0]);
    }, []);

    const onError = useCallback((err: Error) => {
        setError(err.message);
    }, []);

    const { isLoading, error, data } = useQuery(
        ['scraps'],
        () => token && useGetArticleScrap({ pages: pages, size: size, token: token }),
        {
            onSuccess,
            onError,
            select(data) {
                return data?.data?.content;
            },
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    return (
        <>
            {/* Desktop */}

            <Desktop>
                <Box
                    sx={{
                        width: '237px',
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <CategoryItemListProvider.DesktopArticleList />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '1',
                        height: '100%',
                        borderRadius: '8px',
                        backgroundColor: theme.color.Gray_020,
                        boxShadow: '0px 2px 16px 0px rgba(19, 48, 74, 0.08)',
                    }}
                >
                    <Box
                        sx={{
                            p: '9px 16px 9px 0',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            boxSizing: 'border-box',
                        }}
                    >
                        <MoveToPageIcon width='16' height='16' fill={theme.color.Gray_070} />
                    </Box>
                    <iframe src={selectedContent.pageUrl}
                        style={{
                            height: '100%',
                        }} />
                </Box>
                <Box
                    sx={{
                        width: '237px',
                    }}
                >
                    <CategoryItemSelectedProvider.MemoArea />
                </Box>
            </Desktop >

            {/* Mobile */}
            < Mobile >
                <Box
                    sx={{
                        p: '0 24px 24px 24px',
                    }}
                >
                    <CategoryItemListProvider.DesktopArticleList />
                </Box>
            </Mobile >
        </>
    )
}

const VideoListWrapper = styled.div`
    width: 300px;
    padding: 0 10px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
`

const Desktop = styled.div`
    padding: 0 24px;
    gap: 24px;
    box-sizing: border-box;
    height: calc(100% - 84px);
    display: flex;
    @media screen and (max-width: 600px) {
        display: none;
    }
`

const Mobile = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 600px) {
        display: none;
    }
`

export default ExistArticleScrapContainer;
