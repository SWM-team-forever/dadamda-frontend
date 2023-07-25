import styled from "styled-components"
import { Masonry } from "@mui/lab"

import OtherScrapCard from "../molcules/OtherScrapCard"

interface ExistOtherScrapContainerProps {
    contents: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailURL: string,
        scrapCreatedDate: string,
    }[]
}

function ExistOtherScrapContainer({ contents }: ExistOtherScrapContainerProps) {
    return (
        <ScrapList>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                {contents.map(content => {
                    return <OtherScrapCard content={content} />
                }
                )}
            </Masonry>
        </ScrapList>
    )
}

const ScrapList = styled.div`
    display: flex;
    justify-content: center;
    flex: 1;
    align-items: center;
`

export default ExistOtherScrapContainer
