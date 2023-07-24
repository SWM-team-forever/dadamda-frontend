import styled from 'styled-components';

function TrendingPage() {
    return (
        <PageWrapper>
            트렌딩 페이지 입니다.
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
