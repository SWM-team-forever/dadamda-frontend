import { CardActionArea, Box, Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import ColumnContainer from "../../atoms/ColumnContainer";
import ThumbnailImage from "../../atoms/ThumbnailImage";
import { useCategoryItemSelected } from "../../../context/CategoryItemContext";

interface DesktopProductListElementProps {
    content: contentProps['content'],
}

function DesktopProductListElement({ content }: DesktopProductListElementProps) {
    const { thumbnailUrl } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    return (
        <div
            style={{
                width: '196px',
                boxShadow: theme.style.shadow,
                margin: '10px',
                boxSizing: 'border-box',
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
                <Info content={content} />
            </CardActionArea>
        </div>
    )
}

function Info({ content }: DesktopProductListElementProps) {
    const { price, title } = content;

    return (
        <ColumnContainer
            style={{
                boxSizing: 'border-box',
                padding: '10px',
                width: '196px',
            }}>
            <Typography noWrap
                sx={{
                    fontSize: '0.9375rem',
                    lineHeight: '120%',
                }}>
                {title}
            </Typography>
            <Typography
                sx={{
                    fontSize: '0.9375rem',
                    color: theme.color.primary_color,
                }}>
                {price}
            </Typography>
        </ColumnContainer>
    )
}

export default DesktopProductListElement;
