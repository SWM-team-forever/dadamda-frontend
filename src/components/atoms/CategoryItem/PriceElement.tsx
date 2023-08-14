import theme from "../../../assets/styles/theme";
import RowContainer from "../RowContainer";

export function PriceElement({ price }) {
    return (
        <RowContainer
            style={{
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                color: theme.color.primary_color,
                fontWeight: 'bold',
            }}>
            {price}
        </RowContainer>
    );
}
