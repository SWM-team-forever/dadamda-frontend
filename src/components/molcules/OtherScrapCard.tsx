import styled from 'styled-components';

import Button from '../atoms/DefaultButton';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';

interface OtherScrapCardProps {
    content: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailURL: string,
        scrapCreatedDate: string,
    }
}

function OtherScrapCard({ content }: OtherScrapCardProps) {
    return (
        <CardWrapper>
            <CardImage src={content.thumbnailURL} />
            <CardInfoWrapper>
                <EmpasizedTypography>{content.title}</EmpasizedTypography>
                <DefaultTypography>{content.description}</DefaultTypography>
            </CardInfoWrapper>
            <ButtonContainer>
                <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound />
                <MoreIconContainer src={MoreIcon} />
            </ButtonContainer>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    max-width: 200px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    border-radius: 4px;
`

const CardImage = styled.img<{ thumbnailURL: string }>`
    width: 100%;
    height: 140px;
    background: url(${props => props.thumbnailURL}), cover no-repeat;
    border-radius: 4px;
`

const CardInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const EmpasizedTypography = styled.span`
    font-size: 20px;
    font-weight: bold;
`

const DefaultTypography = styled.span`
    font-size: 14px;
`

const ButtonContainer = styled.div`
    display: flex;
`

const MoreIconContainer = styled.img`
    width: 24px;
    height: 24px;
`

export default OtherScrapCard;
