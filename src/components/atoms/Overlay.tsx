import styled from 'styled-components';

interface OverlayProps {
    children: React.ReactNode,
}

function Overlay({ children }: OverlayProps) {
    return (
        <OverlayWrapper>
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
