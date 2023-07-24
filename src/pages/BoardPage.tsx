import styled from 'styled-components';

function BoardPage() {
    return (
        <PageWrapper>
            보드 페이지 입니다.
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

export default BoardPage;
