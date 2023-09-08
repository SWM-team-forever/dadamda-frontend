import theme from "@/assets/styles/theme";
import { IconButtonListElement } from "@/components/atoms/CategoryItem/IconButtonListElement";
import { SiteNameElement } from "@/components/atoms/CategoryItem/SiteNameElement";
import { TitleElement } from "@/components/atoms/CategoryItem/TitleElement";
import ColumnContainer from "@/components/atoms/ColumnContainer";
import RowContainer from "@/components/atoms/RowContainer";
import ThumbnailImage from "@/components/atoms/ThumbnailImage";
import { useCategoryItemSelected } from "@/context/CategoryItemContext";
import { contentProps } from "@/types/ContentType";
import { CardActionArea, Box } from "@mui/material";


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
