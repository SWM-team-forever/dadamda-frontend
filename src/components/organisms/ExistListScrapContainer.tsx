import styled from "styled-components"
import { Masonry } from "@mui/lab"

import OtherScrapCard from "../molcules/OtherScrapCard"
import ProductScrapCard from "../molcules/ProductScrapCard"
import VideoScrapCard from "../molcules/VideoScrapCard"
import ArticleScrapCard from "../molcules/ArticleScrapCard"
import { useEffect } from "react"
import { CircularProgress } from "@mui/material"

interface ExistListScrapContainerProps {
    contents: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailUrl: string,
        scrapCreatedDate: string,
        scrapId: number,
        memoList: [{
            memoId: number,
            memoImageURL?: string,
            memoText?: string,
        }],
        siteName: string,
        author: string,
        authorImageUrl: string,
        blogName: string,
        publishedDate: string,
        price: string,
        channelImageUrl: string,
        channelName: string,
        embedUrl: string,
        genre: string,
        playTime: string,
        watchedCnt: string,
        dtype: string,
    }[],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistListScrapContainer({ contents, isFetching, setIsFetching }: ExistListScrapContainerProps) {
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight, scrollHeight } = document.documentElement;
            if (window.innerHeight + scrollTop >= offsetHeight) {
                setIsFetching(true);
            }
        }

        setIsFetching(true);
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    });

    return (
        <ScrapList>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} style={{ width: '100%' }}>
                {contents.map(content => {
                    switch (content.dtype) {
                        case 'other':
                            return <OtherScrapCard content={content} />;
                        case 'product':
                            return <ProductScrapCard content={content} />;
                        case 'video':
                            return <VideoScrapCard content={content} />;
                        case 'article':
                            return <ArticleScrapCard content={content} />;
                        default:
                            return <OtherScrapCard content={content} />;
                    }
                }
                )}
            </Masonry>
            {isFetching ? <CircularProgress /> : <h3>더 이상 스크랩이 없습니다.</h3>}
        </ScrapList>
    )
}

const ScrapList = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`

export default ExistListScrapContainer;
