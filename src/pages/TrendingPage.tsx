import styled from 'styled-components';

function TrendingPage() {
    return (
        <PageWrapper>
            아직 지원하지 않는 기능입니다.
        </PageWrapper>
    );
}

const PageWrapper = styled.div`
    display: flex;
    width: 100vw;
    height: calc(100vh - 50px);
    justify-content: center;
    align-items: center;
    padding-top: 50px;
`

export default TrendingPage;
