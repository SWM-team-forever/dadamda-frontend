import { CardActionArea } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import ColumnContainer from "../../atoms/ColumnContainer";
import { useCategoryItemSelected } from "../../../context/CategoryItemContext";
import { ThumbnailElement } from "../../atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "../../atoms/CategoryItem/TitleElement";
import { PriceElement } from "../../atoms/CategoryItem/PriceElement";

interface DesktopProductListElementProps {
    content: contentProps['content'],
}

function DesktopProductListElement({ content }: DesktopProductListElementProps) {
    const { thumbnailUrl, price, title } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
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
                <ThumbnailElement thumbnailUrl={thumbnailUrl} />
                <Info />
            </CardActionArea>
        </div>
    )
}


export default DesktopProductListElement;
