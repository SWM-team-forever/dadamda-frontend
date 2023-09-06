import { useLocation } from "react-router-dom";

import theme from "../../../assets/styles/theme";

import ColumnContainer from "../../atoms/ColumnContainer";
import { TotalIcon, ArticleIcon, ProductIcon, VideoIcon, LocationIcon, EtcIcon } from "../../atoms/Icon";
import NavigationMenuItem from "../../atoms/Navigation/NavigationMenuItem";

function ScrapNaviagtion() {
    const scrapMenuItem = [
        {
            name: '전체',
            icon: <TotalIcon size='24' fill={theme.color.Gray_060} />,
            selectedIcon: <TotalIcon size='24' fill={theme.color.Blue_080} />,
            link: '/scrap/list',
        }, {
            name: '아티클',
            icon: <ArticleIcon width='24' height='24' fill={theme.color.Gray_060} color={theme.color.Gray_090} />,
            selectedIcon: <ArticleIcon width='24' height='24' fill={theme.color.Blue_070} color={theme.color.Blue_080} />,
            link: '/scrap/article',
        }, {
            name: '상품',
            icon: <ProductIcon size='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
            selectedIcon: <ProductIcon size='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
            link: '/scrap/product',
        }, {
            name: '비디오',
            icon: <VideoIcon size='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
            selectedIcon: <VideoIcon size='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
            link: '/scrap/video',
        }, {
            name: '장소',
            icon: <LocationIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} secondaryColor={theme.color.Gray_020} />,
            selectedIcon: <LocationIcon width='24' height='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} secondaryColor={theme.color.Gray_020} />,
            link: '/scrap/location',
        }, {
            name: '기타',
            icon: <EtcIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />,
            selectedIcon: <EtcIcon width='24' height='24' fill={theme.color.Blue_080} color={theme.color.Blue_070} />,
            link: '/scrap/other',
        }];

    const { pathname } = useLocation();

    return (
        <ColumnContainer>
            {scrapMenuItem.map(item => {
                const isActive = pathname === item.link;

                return (
                    <NavigationMenuItem item={item} isActive={isActive} />
                )
            })}
        </ColumnContainer >
    )
}

export default ScrapNaviagtion
