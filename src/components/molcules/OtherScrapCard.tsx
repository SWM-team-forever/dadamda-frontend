import styled from 'styled-components';

import Memo from './Memo';
import Button from '../atoms/DefaultButton';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';

import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';

interface OtherScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function OtherScrapCard({ content, showMemoCreateModal, showTooltip }: OtherScrapCardProps) {

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}
        >
            <CardImage src={content.thumbnailUrl} />
            <CardInfoWrapper>
                {content.title && <EmpasizedTypography>{content.title}</EmpasizedTypography>}
                {content.description && <DefaultTypography>{content.description}</DefaultTypography>}
            </CardInfoWrapper>
            {content.memoList?.map(memo => {
                return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
            })}
            <ButtonContainer>
                <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound onClick={(e) => {
                    e.stopPropagation();
                    showMemoCreateModal();
                }} />
                <MoreIconContainer src={MoreIcon} onClick={(e) => {
                    e.stopPropagation();
                    showTooltip();
                }} />
            </ButtonContainer>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: white;
    border-radius: 4px;
`

const CardImage = styled.img`
    width: 100%;
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
    color: ${theme.color.text_gray_color};
`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`

const MoreIconContainer = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export default OtherScrapCard;
