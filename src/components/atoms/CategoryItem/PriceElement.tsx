import { Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import RowContainer from "../RowContainer";

const mobileProductStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
};

const desktopProductItemStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
};

const desktopProductListStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
};

const scrapCardStyle = {
    color: theme.color.Gray_090,
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
}

const siteNameStyles = {
    mobileProduct: mobileProductStyle,
    desktopProductItem: desktopProductItemStyle,
    desktopProductList: desktopProductListStyle,
    scrapCard: scrapCardStyle,
};

export function PriceElement({ price, varient }: any) {
    return (
        <RowContainer
            style={{
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
            }}>
            <Typography sx={siteNameStyles[varient as keyof typeof siteNameStyles]}>
                {price}
            </Typography>
        </RowContainer>
    );
}
