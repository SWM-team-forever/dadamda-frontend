import { Masonry } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroller';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { useGetScrapByType } from '@/api/scrap';
import { useGetScrapSearchResultByType } from '@/api/search';
import { contentProps } from '@/types/ContentType';

import EmptyScrapContainer from '@/components/organisms/EmptyScrapContainer';
import ScrapCard from '@/components/organisms/ScrapCard';
import { useGetToken } from '@/hooks/useAccount';

function MasonryListTemplate({ type }: { type: string }) {
    const token = useGetToken();
    const size = 30;
    const [searchParams, setSearchParams] = useSearchParams();

    function isSearchTemplate() {
        return searchParams.has('keyword');
    }

    function getKeyword() {
        return searchParams.get('keyword');
    }

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
        ['scraps', type, getKeyword()],
        ({ pageParam = 0 }) => {
            return token && (isSearchTemplate()
                ? useGetScrapSearchResultByType({ type: type, pages: pageParam, size: size, token: token, keyword: getKeyword() })
                : useGetScrapByType({ type: type, pages: pageParam, size: size, token: token })
            )
        },
        {
            getNextPageParam: (lastPage) => {
                const nextPage = !lastPage.data.last ? lastPage.data.pageable.pageNumber + 1 : undefined;
                return nextPage;
            },
        }
    );

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

    if (data?.pages[0].data.content.length === 0) {
        return <EmptyScrapContainer />
    }

    return (
        <ScrapList>
            <InfiniteScroll
                hasMore={hasNextPage}
                loadMore={() => fetchNextPage()}
                pageStart={0}
                loader={<CircularProgress
                    key={0}
                />}
                useWindow={false}
                style={{
                    width: '100%',
                    margin: '0',
                }}
            >
                <Masonry
                    columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}

                >
                    {data?.pages.map((page) => {
                        return page.data.content.map((content: contentProps['content']) => {
                            return (
                                <ScrapCard content={content} key={content.scrapId} />
                            )
                        })
                    }
                    ) || []}
                </Masonry>
            </InfiniteScroll>
        </ScrapList >
    )
}

const ScrapList = styled.div`
    display: flex;
    flex: 1;
    padding: 0 24px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`

export default MasonryListTemplate;
