import styled from "styled-components"
import { Masonry } from "@mui/lab"
import { useCallback, useState } from "react"
import { CircularProgress } from "@mui/material"

import ScrapCard from "./ScrapCard"
import { useQuery } from "@tanstack/react-query"
import { useGetListScrap } from "../../api/scrap"
import { contentProps } from "../../types/ContentType"

function ExistListScrapContainer() {
    const token = localStorage.getItem('token');
    const size = 10;
    const [pages, setPages] = useState(0);
    const [, setError] = useState<string | null>(null);

    const onError = useCallback((err: Error) => {
        setError(err.message);
    }, []);

    const { isLoading, data } = useQuery(
        ['scraps'],
        () => token && useGetListScrap({ pages: pages, size: size, token: token }),
        {
            onError,
            select(data) {
                return data?.data?.content;
            },
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    return (
        <ScrapList>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2} style={{ width: '100%' }}>
                {data.map((content: contentProps['content']) => {
                    return <ScrapCard content={content} />
                }
                )}
            </Masonry>
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

export default ExistListScrapContainer;
