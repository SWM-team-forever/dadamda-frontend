import styled from 'styled-components';

interface RowContainerProps {
    children: React.ReactNode,
}

function RowContainer({ children }: RowContainerProps) {
    return (
        <Wrapper>{children}</Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
`

export default RowContainer;
