import styled from 'styled-components';
import theme from '../assets/styles/theme';
import Button from '../components/atoms/DefaultButton';

function MainPage() {
  return (
    <TopContainer>
      <BackgroundContainer>
        <ContentContainer>
          <TextContainer>
            <TypographyGroup>
              <EmpasizedTypography style={{ fontWeight: "bold" }}>뭘 좋아하는 지 몰라서</EmpasizedTypography>
              <EmpasizedTypography>다 준비해보았습니다</EmpasizedTypography>
            </TypographyGroup>
            <TypographyGroup>
              <DefaultTypography>내용에 따라 자동으로 북마크를 구성하는</DefaultTypography>
              <DefaultTypography>신개념 컨텐츠 맞춤 스크랩 서비스, 다담다</DefaultTypography>
            </TypographyGroup>
            <Button label='서비스 시작하기' fullWidth isRound buttonStyle='primary' />
          </TextContainer>
          <ImageContainer />
        </ContentContainer>
      </BackgroundContainer>

      <BackgroundContainer>
        <Container>
          <EmpasizedTypography style={{ fontWeight: "bold", margin: "20px" }}>쉽게 저장하고, 꾸미고, 공유하고</EmpasizedTypography>
          <Content>
            <ImageTextContainer>
              <Image />
              <TypographyGroup>
                <DefaultTypography>링크를 저장하면</DefaultTypography>
                <DefaultTypography>해당 컨텐츠에 적합한 형태로 정보를 보여줍니다.</DefaultTypography>
              </TypographyGroup>
            </ImageTextContainer>
            <ImageTextContainer>
              <Image />
              <TypographyGroup>
                <DefaultTypography>저장한 북마크는</DefaultTypography>
                <DefaultTypography>사용자의 취향에 맞추어 보드에 정렬할 수 있습니다.</DefaultTypography>
              </TypographyGroup>
            </ImageTextContainer>
            <ImageTextContainer>
              <Image />
              <TypographyGroup>
                <DefaultTypography>다른 사람의 보드를 구경하며</DefaultTypography>
                <DefaultTypography>인사이트를 얻어보세요!</DefaultTypography>
              </TypographyGroup>
            </ImageTextContainer>
          </Content>
        </Container>
      </BackgroundContainer>

      <LastContainer>
        <EmpasizedTypography><strong>세상 모든 컨텐츠를 다담다</strong></EmpasizedTypography>
        <TypographyGroup>
          <DefaultTypography>다담다 서비스는 사용자의 편의를 위해 크롬 익스텐션을 제공하고 있습니다.</DefaultTypography>
          <DefaultTypography>크롬 익스텐션을 설치하시겠습니까?</DefaultTypography>
        </TypographyGroup>
        <ButtonContainer>
          <Button label='크롬익스텐션 설치하기' fullWidth isRound buttonStyle='primary' />
          <Button label='웹으로 서비스 시작하기' fullWidth isRound buttonStyle='primary' />
        </ButtonContainer>
      </LastContainer>
    </TopContainer>
  )
}

const TopContainer = styled.div`
    background-color: ${theme.color.background_color};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 50px);
    overflow: auto;
`

const BackgroundContainer = styled.div`    
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 600px) {
      flex-direction: column;
  }
  margin: 20px;
`

const TextContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 20px;
`

const ImageContainer = styled.div`
  width: 50%;
  min-width: 300px;
  aspect-ratio: 16/9;
  background-color: ${theme.color.primary_color};
`

const EmpasizedTypography = styled.span`
  font-size: 1.75rem;
`

const DefaultTypography = styled.span`
  font-size: 0.875rem;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 20px;
`

const Content = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  @media screen and (max-width: 600px) {
      flex-direction: column;
  }
`

const ImageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`

const Image = styled.div`
  background-color: ${theme.color.primary_color};
  width: 80%;
  aspect-ratio: 1/1;
`
const LastContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`
const TypographyGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MainPage;
