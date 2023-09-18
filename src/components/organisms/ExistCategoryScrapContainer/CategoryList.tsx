import { uesGetProductScrap, useGetArticleScrap, useGetVideoScrap } from '@/api/scrap';
import ColumnContainer from '@/components/atoms/ColumnContainer';
import DesktopArticleListElement from '@/components/molcules/CategoryItem/CategoryScrapList/DesktopArticleListElement';
import { useSelectedScrap } from '@/hooks/useSelectedScrap';
import { CircularProgress } from '@mui/material';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import { useSearchParams } from 'react-router-dom';

function CategoryList() {
    const token = localStorage.getItem('token');
    const size = 2;

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        ['scraps'],
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

    const [searchParams, setSearchParams] = useSearchParams();
    const scrapId = searchParams.get('scrapId');
    const { setSelectedScrap } = useSelectedScrap();

    useEffect(() => {
        if (!scrapId) {
            setSelectedScrap(data?.pages[0].data.content[0]);
        }
    })

    return (

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
                            <DesktopArticleListElement content={content} />
                        )
                    })
                )}
            </ColumnContainer>
        </InfiniteScroll>

    );
}

export default CategoryList;
