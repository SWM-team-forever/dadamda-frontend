import styled from 'styled-components';

import { contentProps } from '../organisms/ScrapCard';
import Memo from './Memo';
import Chip from '../atoms/Chip';
import Button from '../atoms/DefaultButton';
import RowContainer from '../atoms/RowContainer';
import ProfileImage from '../atoms/ProfileImage';
import ColumnContainer from '../atoms/ColumnContainer';

import defaultImage from '../../assets/images/Avatar.png';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import theme from '../../assets/styles/theme';

interface ArticleScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function ArticleScrapCard({ content, showMemoCreateModal, showTooltip }: ArticleScrapCardProps) {

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}
        >
            {content.siteName && <Chip>{content.siteName}</Chip>}
            {content.title && <EmpasizedTypography>{content.title}</EmpasizedTypography>}
            <CardImage src={content.thumbnailUrl} />
            <RowContainer style={{ justifyContent: 'space-between' }}>
                {(content.author || content.blogName) &&
                    <RowContainer style={{ gap: '10px', alignItems: 'center' }}>
                        {content.authorImageUrl ? <ProfileImage size={30} source={content.authorImageUrl} /> : <ProfileImage size={30} source={defaultImage} />}
                        <ColumnContainer>
                            {content.author && <EmpasizedTypography>{content.author}</EmpasizedTypography>}
                            {content.blogName && <DefaultTypography>{content.blogName}</DefaultTypography>}
                        </ColumnContainer>
                    </RowContainer>
                }
                {content.publishedDate && <DefaultTypography>{content.publishedDate}</DefaultTypography>}
            </RowContainer>
            {content.description && <DefaultTypography>{content.description}</DefaultTypography>}
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
    gap: 10px;
    background-color: white;
    border-radius: 4px;
`

const CardImage = styled.img`
    width: 100%;
    height: 140px;
    border-radius: 4px;
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

export default ArticleScrapCard;
