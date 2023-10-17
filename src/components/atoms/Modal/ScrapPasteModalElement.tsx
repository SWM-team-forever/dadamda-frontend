import { useGetScrapByType } from "@/api/scrap";
import { useGetScrapSearchResultByType } from "@/api/search";
import ScrapCard from "@/components/molcules/Board/ScrapCard";
import SearchBar from "@/components/molcules/SearchBar";
import { useBoardContentAtom } from "@/hooks/useBoardContentAtom";
import { contentProps } from "@/types/ContentType";
import { logEvent } from "@/utility/amplitude";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, CircularProgress, Tab, Tabs } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function ScrapPasteModalElement() {
    const token = localStorage.getItem('token');
    const size = 30;
    const [value, setValue] = useState('list');
    const handleTabValueChange = (_event: SyntheticEvent<Element, Event>, newValue: string) => {
        setValue(newValue);
    }

    const [searchParams, setSearchParams] = useSearchParams();

    function isSearchTemplate() {
        return searchParams.has('keyword');
    }

    function getKeyword() {
        return searchParams.get('keyword');
    }

    const { pasteScrap } = useBoardContentAtom();

    const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
        ['scraps', value, getKeyword()],
        ({ pageParam = 0 }) => {
            return token && (isSearchTemplate()
                ? useGetScrapSearchResultByType({ type: value, pages: pageParam, size: size, token: token, keyword: getKeyword() })
                : useGetScrapByType({ type: value, pages: pageParam, size: size, token: token }))
        },
        {
            getNextPageParam: (lastPage) => {
                const nextPage = !lastPage.data.last ? lastPage.data.pageable.pageNumber + 1 : undefined;
                return nextPage;
            },
        }
    );

    function deleteSearchParams() {
        searchParams.delete('keyword');
        setSearchParams(searchParams);
    }

    useEffect(() => {
        return () => deleteSearchParams();
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
    }

    return (
        <Box
            sx={{
                height: '100%',
            }}
        >
            <TabContext value={value}>
                <SearchBar type="list" />
                <Tabs
                    variant="fullWidth"
                    sx={{
                        '& .MuiButtonBase-root': {
                            minWidth: 'auto',
                        }
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
                    <Tab label="장소" value='place' disabled />
                </Tabs>
                <TabPanel
                    value={value}
                    sx={{
                        height: 'calc(100% - 200px)',
                        overflowY: 'auto',
                    }}
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
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default ScrapPasteModalElement;
