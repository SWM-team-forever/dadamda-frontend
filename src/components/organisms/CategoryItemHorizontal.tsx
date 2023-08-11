import { CardActionArea, Box, CardContent, Typography } from "@mui/material";
import styled from "styled-components";
import ThumbnailImage from "../atoms/ThumbnailImage";
import { useSelectedCategoryItem } from "./SelectedCategoryItem";
import theme from "../../assets/styles/theme";

function CategoryItemHorizontal({ content }) {
    const { thumbnailUrl, title, channelName } = content;
    const [selectedContent, setSelectedContent] = useSelectedCategoryItem();

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
                    <ThumbnailImage thumbnailUrl={thumbnailUrl} />
                </Box>
                <CardContent sx={{
                    width: '70%',
                    padding: '0',
                }}>
                    <Typography gutterBottom component="div" color='text.primary' noWrap
                        sx={{
                            lineHeight: '120%',
                            fontSize: '0.75rem',
                        }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap
                        sx={{
                            fontSize: '0.625rem',
                        }}
                    >
                        {channelName}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </div>
    )
}

export default CategoryItemHorizontal;