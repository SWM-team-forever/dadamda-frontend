import styled from "styled-components"
import { Masonry } from "@mui/lab"

import OtherScrapCard from "../molcules/OtherScrapCard"
import { useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { CircularProgress } from "@mui/material";
import theme from "../../assets/styles/theme";
import ScrapCard from "./ScrapCard";

interface ExistOtherScrapContainerProps {
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
    }[],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistOtherScrapContainer({ contents, isFetching, setIsFetching }: ExistOtherScrapContainerProps) {
    const [bottom, setBottom] = useState<HTMLDivElement | null>(null);
    useInfiniteScroll(setIsFetching, bottom);

    return (
        <ScrapList>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} style={{ width: '100%' }}>
                {contents.map(content => {
                    return <ScrapCard content={content} />
                }
                )}
            </Masonry>
            {isFetching && <CircularProgress />}
            <h5
                ref={setBottom}
                style={{
                    marginTop: '0',
                    color: theme.color.icon_color,
                }}>
                더 이상 스크랩이 없습니다.
            </h5>
        </ScrapList>
    )
}

const ScrapList = styled.div`
    display: flex;
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`

export default ExistOtherScrapContainer
