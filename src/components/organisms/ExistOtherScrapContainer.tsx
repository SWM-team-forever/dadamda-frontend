import styled from "styled-components"
import { useState } from "react";
import { Masonry } from "@mui/lab"
import { CircularProgress } from "@mui/material";

import ScrapCard, { contentProps } from "./ScrapCard";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import theme from "../../assets/styles/theme";

interface ExistOtherScrapContainerProps {
    contents: contentProps["content"][],
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
