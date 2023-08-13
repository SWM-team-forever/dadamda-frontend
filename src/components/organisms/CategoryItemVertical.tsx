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

interface CategoryItemHorizontal {
    content: contentProps['content'],
}

function CategoryItemVertical({ content }: CategoryItemHorizontal) {
    const { thumbnailUrl } = content;
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
                <Header content={content} />
            </CardActionArea>
        </div>
    )
}

function Header({ content }: CategoryItemHorizontal) {
    const { siteName, title, pageUrl, scrapId } = content;

    const scrapCardMenu = [{
        name: '카드 수정하기',
        onClick: () => {
            hideTooltip();
            showScrapEditModal();
        },
    }, {
        name: '카드 삭제하기',
        onClick: () => {
            hideTooltip();
            showScrapDeleteModal();
        },
    }];

    function showTooltip() {
        setIsTooltipVisible(true);
    }

    function hideTooltip() {
        setIsTooltipVisible(false);
    }

    function showScrapEditModal() {
        setIsScrapEditModalVisible(true);
    }

    function hideScrapEditModal() {
        setIsScrapEditModalVisible(false);
    }

    function showScrapDeleteModal() {
        setIsScrapDeleteModalVisible(true);
    }

    function hideScrapDeleteModal() {
        setIsScrapDeleteModalVisible(false);
    }

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isScrapEditModalVisible, setIsScrapEditModalVisible] = useState(false);
    const [isScrapDeleteModalVisible, setIsScrapDeleteModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
                    <Typography
                        sx={{
                            wordBreak: 'break-all',
                        }}>
                        {siteName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                            lineHeight: '120%',
                        }}>
                        {title}
                    </Typography>
                </ColumnContainer>
                <RowContainer style={{ gap: '5px' }}>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        window.open(`${pageUrl}`);
                    }}>
                        <ShortcutIcon size='24' fill={theme.color.icon_color} />
                    </div>
                    <div
                        onClick={() => showTooltip()}
                        style={{
                            position: 'relative',
                            height: 'fit-content',
                        }}
                    >
                        <MoreIcon size='24' fill={theme.color.icon_color} />
                        {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
                    </div>
                </RowContainer>
            </RowContainer>
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} setError={setError} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={scrapId} setError={setError} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible) && <Overlay />}
        </>
    )
}

export default CategoryItemVertical;