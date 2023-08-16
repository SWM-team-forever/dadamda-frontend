import { CardActionArea, Box, CardContent, Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import ThumbnailImage from "../../atoms/ThumbnailImage";
import { useCategoryItemSelected } from "../../../context/CategoryItemContext";
import { ThumbnailElement } from "../../atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "../../atoms/CategoryItem/TitleElement";
import { ChannelElement } from "../../atoms/CategoryItem/ChannelElement";

interface DesktopVideoListElementProps {
    content: contentProps['content'],
}

function DesktopVideoListElement({ content }: DesktopVideoListElementProps) {
    const { thumbnailUrl, title, channelName } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const varient = 'desktopVideoList';

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
                    width: '100%',
                    gap: '5px',
                    padding: '10px',
                }}
            >
                <Box
                    sx={{
                        width: '30%'
                    }}>
                    <ThumbnailElement thumbnailUrl={thumbnailUrl} />
                </Box>
                <CardContent sx={{
                    width: '70%',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}>
                    <TitleElement title={title} varient={varient} />
                    <ChannelElement channelName={channelName} varient={varient} />

                </CardContent>
            </CardActionArea>
        </div>
    )
}

export default DesktopVideoListElement;
