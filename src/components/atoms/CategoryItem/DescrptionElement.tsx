import RowContainer from "../RowContainer";

export function DescriptionElement({ description }) {
    return (
        <RowContainer
            style={{
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
            }}>
            {description}
        </RowContainer>
    )
}