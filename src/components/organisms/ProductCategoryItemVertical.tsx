import { CardActionArea, Box, CardContent, Typography } from "@mui/material";
import ThumbnailImage from "../atoms/ThumbnailImage";
import { useSelectedCategoryItem } from "./SelectedCategoryItem";
import theme from "../../assets/styles/theme";
import RowContainer from "../atoms/RowContainer";
import { useState } from "react";
import ColumnContainer from "../atoms/ColumnContainer";
import { ShortcutIcon, MoreIcon } from "../atoms/Icon";
import Overlay from "../atoms/Overlay";
import ScrapDeleteModal from "./ScrapDeleteModal";
import ScrapEditModal from "./ScrapEditModal";
import { contentProps } from "../../types/ContentType";
import Tooltip from "../atoms/Tooltip";

interface ProductCategoryItemHorizontal {
    content: contentProps['content'],
}

function ProductCategoryItemVertical({ content }: ProductCategoryItemHorizontal) {
    const { thumbnailUrl } = content;
    const [selectedContent, setSelectedContent] = useSelectedCategoryItem();

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

function Info({ content }: ProductCategoryItemHorizontal) {
    const { price, title, pageUrl, scrapId } = content;

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

export default ProductCategoryItemVertical;
