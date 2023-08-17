import { CardActionArea, Box } from "@mui/material";
import { useCategoryItemSelected } from "../../../context/CategoryItemContext";
import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import ColumnContainer from "../../atoms/ColumnContainer";
import RowContainer from "../../atoms/RowContainer";
import ThumbnailImage from "../../atoms/ThumbnailImage";
import { IconButtonListElement } from "../../atoms/CategoryItem/IconButtonListElement";
import { TitleElement } from "../../atoms/CategoryItem/TitleElement";
import { SiteNameElement } from "../../atoms/CategoryItem/SiteNameElement";

interface MobileVideoListElementProps {
    content: contentProps['content'],
}

function MobileVideoListElement({ content }: MobileVideoListElementProps) {
    const { thumbnailUrl, siteName, title, } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const varient = 'MobileVideo';

    function Header() {

        return (
            <>
                <RowContainer
                    style={{
                        gap: '5px',
                        width: '100%',
                        boxSizing: 'border-box',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}>
                    <ColumnContainer>
                        <SiteNameElement siteName={siteName} varient={varient} />
                        <TitleElement title={title} varient={varient} />
                    </ColumnContainer>
                    <IconButtonListElement content={content} />
                </RowContainer>
            </>
        )
    }

    return (
        <div
            style={{
                width: '100%',
                boxShadow: 'none',
                borderRadius: '0',
                display: 'block',
                backgroundColor: `${selectedContent.scrapId === content.scrapId ? theme.color.background_color : 'white'}`,
            }}
            onClick={() => setSelectedContent(content)}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '5px',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    {thumbnailUrl && <ThumbnailImage thumbnailUrl={thumbnailUrl} />}
                </Box>
                <Header />
            </CardActionArea>
        </div>
    )
}


export default MobileVideoListElement;
