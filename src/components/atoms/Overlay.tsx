import styled from 'styled-components';

interface OverlayProps {
    children?: React.ReactNode,
    onClick?: (e: React.MouseEvent) => void,
}

function Overlay({ children, onClick }: OverlayProps) {
    return (
        <OverlayWrapper onClick={onClick}>
            {children}
        </OverlayWrapper>
    );
}

const OverlayWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
`

export default Overlay;
