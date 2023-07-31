import styled from 'styled-components';

interface ColumnContainer {
    children?: React.ReactNode,
    style?: object,
}

function ColumnContainer({ children, style }: ColumnContainer) {
    return (
        <Wrapper style={{ ...style }}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export default ColumnContainer;
