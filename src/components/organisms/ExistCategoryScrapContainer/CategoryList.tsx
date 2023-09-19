import ColumnContainer from '@/components/atoms/ColumnContainer';
import DesktopArticleListElement from '@/components/molcules/CategoryItem/CategoryScrapList/DesktopScrapListElement';
import { CircularProgress } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';

function CategoryList({ hasNextPage, fetchNextPage, data }: { hasNextPage: boolean | undefined, fetchNextPage: any, data: any }) {

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
                {data?.pages.map((page: { data: { content: any[]; }; }) =>
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
