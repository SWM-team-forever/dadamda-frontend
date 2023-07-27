import styled from 'styled-components';

interface RowContainerProps {
    children: React.ReactNode,
    style: object,
}

function RowContainer({ children, style }: RowContainerProps) {
    return (
        <Wrapper style={{ ...style }}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
`

export default RowContainer;
