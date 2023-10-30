import { TabContext, TabPanel } from "@mui/lab";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SyntheticEvent, useEffect, useState } from "react";

import { useGetScrapByType } from "@/api/scrap";
import { useGetScrapSearchResultByType } from "@/api/search";
import { useGetToken } from "@/hooks/useAccount";
import { useBoardContentAtom } from "@/hooks/useBoardContentAtom";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { contentProps } from "@/types/ContentType";
import { logEvent } from "@/utility/amplitude";

import ScrapCard from "@/components/molcules/Board/ScrapCard";
import SearchBar from "@/components/molcules/SearchBar";
import InfiniteScroll from "react-infinite-scroller";
import { useSearch } from "@/hooks/useSearch";

function ScrapPasteModalElement() {
    const token = useGetToken();
    const size = 2;
    const [value, setValue] = useState('list');
    const handleTabValueChange = (_event: SyntheticEvent<Element, Event>, newValue: string) => {
        setValue(newValue);
    }

    const { search, undoSearch } = useSearch();

    const { pasteScrap } = useBoardContentAtom();

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
        ['scraps', value, search.keyword],
        ({ pageParam = 0 }) => {
            return token && (search.isSearched
                ? useGetScrapSearchResultByType({ type: value, pages: pageParam, size: size, token: token, keyword: search.keyword })
                : useGetScrapByType({ type: value, pages: pageParam, size: size, token: token }))
        },
        {
            getNextPageParam: (lastPage) => {
                const nextPage = !lastPage.data.last ? lastPage.data.pageable.pageNumber + 1 : undefined;
                return nextPage;
            },
            retry: false,
            useErrorBoundary: true,
        }
    );

    useEffect(() => {
        return () => undoSearch();
    }, [])


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

    const handlePasteScrap = (content: contentProps['content']) => {
        logEvent('paste_scrap', { type: content.dtype });
        pasteScrap(content);
        useDefaultSnackbar('스크랩이 추가되었습니다.', 'success');
    }

    return (
        <Box
            sx={{
                height: '100%',
            }}
        >
            <TabContext value={value}>
                <SearchBar type={value} />
                <Tabs
                    variant="fullWidth"
                    sx={{
                        '& .MuiButtonBase-root': {
                            minWidth: 'auto',
                            p: '12px 0',
                        },
                    }}
                    onChange={handleTabValueChange}
                    visibleScrollbar
                    indicatorColor='primary'
                    value={value}
                >
                    <Tab label="전체" value='list' />
                    <Tab label="상품" value='product' />
                    <Tab label="아티클" value='article' />
                    <Tab label="비디오" value='video' />
                    <Tab label="기타" value='other' />
                </Tabs>
                <TabPanel
                    value={value}
                    sx={{
                        height: 'calc(100% - 200px)',
                        overflowY: 'auto',
                    }}
                >
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => fetchNextPage()}
                        hasMore={hasNextPage}
                        loader={
                            <div className="loader" key={0}>
                                <CircularProgress />
                            </div>
                        }
                        useWindow={false}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            {data?.pages.map((page) => {
                                return page.data.content.map((content: contentProps['content']) => {
                                    return (
                                        <Box
                                            onClick={() => handlePasteScrap(content)}
                                        >
                                            <ScrapCard content={content} key={content.scrapId} />
                                        </Box>
                                    )
                                })
                            }
                            ) || []}
                        </Box>
                    </InfiniteScroll>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default ScrapPasteModalElement;
