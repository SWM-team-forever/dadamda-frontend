import { CircularProgress, Box } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';

import CategoryItemListProvider, { useCategoryItemList } from '@/context/CategoryListContext';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '@/context/CategoryItemContext';
import { useGetArticleScrap } from '@/api/scrap';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import theme from '@/assets/styles/theme';
import { MoveToPageIcon } from '@/components/atoms/Icon';
import ScrapCard from '@/components/organisms/ScrapCard';
import { useSelectedScrap } from '@/hooks/useSelectedScrap';
import { useEffect, useLayoutEffect } from 'react';

function ExistArticleScrapContainer() {
    const token = localStorage.getItem('token');
    const size = 2;
    const { selectedScrap, setSelectedScrap, removeSelectedScrap } = useSelectedScrap();


    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['articleScrap'],
        ({ pageParam = 0 }) => {
            return token && useGetArticleScrap({ pages: pageParam, size: size, token: token })
        },
        {
            getNextPageParam: (lastPage) => {
                const nextPage = !lastPage.data.last ? lastPage.data.pageable.pageNumber + 1 : undefined;
                return nextPage;
            },

        }
    );

    // useLayoutEffect(() => {
    //     selectedScrap.scrapId === 0 && setSelectedScrap(data?.pages[0].data.content[0]);
    // })

    function isSelectedScrapExist() {
        return selectedScrap.scrapId === 0;
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
                    <InfiniteScroll
                        hasMore={hasNextPage}
                        loadMore={() => fetchNextPage()}
                        pageStart={0}
                        loader={<CircularProgress
                            key={0}
                        />}
                        useWindow={false}
                    >
                        <ColumnContainer style={{
                            gap: '24px',
                        }}>
                            {data?.pages.map((page) =>
                                page.data.content.map((content) => {
                                    return (
                                        <ScrapCard content={content} />
                                    )
                                })
                            )}
                        </ColumnContainer>
                    </InfiniteScroll>
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
                    {isSelectedScrapExist()
                        ? <iframe src={selectedScrap.pageUrl}
                            style={{
                                height: '100%',
                            }}
                        />
                        : <iframe src={data?.pages[0].data.content[0].pageUrl}
                            style={{
                                height: '100%',
                            }}
                        />
                    }
                </Box>
                <Box
                    sx={{
                        width: '237px',
                    }}
                >
                    {/* <CategoryItemSelectedProvider.MemoArea /> */}
                </Box>
            </Desktop >

            {/* Mobile */}
            < Mobile >
                <Box
                    sx={{
                        p: '0 24px 24px 24px',
                    }}
                >
                    {/* <CategoryItemListProvider.DesktopArticleList /> */}
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
