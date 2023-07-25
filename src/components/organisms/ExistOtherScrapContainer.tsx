import styled from "styled-components"
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
            {contents.map(content => {
                return <OtherScrapCard content={content} />
            }
            )}
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
