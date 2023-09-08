import theme from "@/assets/styles/theme";
import { PriceElement } from "@/components/atoms/CategoryItem/PriceElement";
import { ThumbnailElement } from "@/components/atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "@/components/atoms/CategoryItem/TitleElement";
import ColumnContainer from "@/components/atoms/ColumnContainer";
import { useCategoryItemSelected } from "@/context/CategoryItemContext";
import { useCategoryItemList } from "@/context/CategoryListContext";
import { contentProps } from "@/types/ContentType";
import { CardActionArea } from "@mui/material";
import { useEffect } from "react";

interface DesktopProductListElementProps {
    content: contentProps['content'],
}

function DesktopProductListElement({ content }: DesktopProductListElementProps) {
    const { thumbnailUrl, price, title, scrapId } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const varient = 'desktopProductList';

    function Info() {

        return (
            <ColumnContainer
                style={{
                    boxSizing: 'border-box',
                    padding: '10px',
                    width: '196px',
                }}>
                <TitleElement title={title} varient={varient} />
                <PriceElement price={price} varient={varient} />
            </ColumnContainer>
        )
    }

    return (
        <div
            style={{
                width: '196px',
                boxShadow: theme.style.shadow,
                margin: '10px',
                boxSizing: 'border-box',
                backgroundColor: `${selectedContent.scrapId === scrapId ? theme.color.background_color : 'white'}`,
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
                <ThumbnailElement thumbnailUrl={thumbnailUrl} />
                <Info />
            </CardActionArea>
        </div>
    )
}


export default DesktopProductListElement;
