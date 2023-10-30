import { Masonry } from '@mui/lab';
import { Box, CircularProgress } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';

import { useGetScrapByType } from '@/api/scrap';
import { useGetScrapSearchResultByType } from '@/api/search';
import { contentProps } from '@/types/ContentType';
import { useGetToken } from '@/hooks/useAccount';

import EmptyScrapContainer from '@/components/organisms/EmptyScrapContainer';
import ScrapCard from '@/components/organisms/ScrapCard';
import { useSearch } from '@/hooks/useSearch';
import { useEffect } from 'react';

function MasonryListTemplate({ type }: { type: string }) {
    const token = useGetToken();
    const size = 30;
    const { search, undoSearch } = useSearch();

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
        ['scraps', type, search.keyword, search.isSearched],
        ({ pageParam = 0 }) => {
            return token && (search.isSearched
                ? useGetScrapSearchResultByType({ type: type, pages: pageParam, size: size, token: token, keyword: search.keyword })
                : useGetScrapByType({ type: type, pages: pageParam, size: size, token: token })
            )
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.data.last ? undefined : lastPage.data.number + 1;
            },
            retry: false,
            useErrorBoundary: true,
        }
    );

    useEffect(() => {
        return () => undoSearch();
    }, []);

    if (isLoading) {
        return (
            <CircularProgress
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            />
        )
    }

    if (!data || data?.pages[0].data.content.length === 0) {
        return <EmptyScrapContainer />
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flex: '1',
                boxSizing: 'border-box',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                overflow: 'auto',
            }}
        >
            <InfiniteScroll
                hasMore={hasNextPage}
                loadMore={() => fetchNextPage()}
                useWindow={false}
                style={{
                    width: '100%'
                }}
            >
                <Masonry
                    columns={{
                        xs: 1, sm: 2, md: 3, lg: 4, xl: 5
                    }}
                    sx={{
                        m: 0,
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    spacing={1}
                >
                    {data.pages?.map((page) => {
                        return page.data.content.map((content: contentProps['content']) => {
                            return (
                                <ScrapCard content={content} key={content.scrapId} />
                            )
                        })
                    })}
                </Masonry>
            </InfiniteScroll>
        </Box >
    )
}

export default MasonryListTemplate;
