import styled from 'styled-components';

import { contentProps } from '../../types/ContentType';
import Memo from './Memo';
import Chip from '../atoms/Chip';
import Button from '../atoms/DefaultButton';
import RowContainer from '../atoms/RowContainer';
import ProfileImage from '../atoms/ProfileImage';
import ColumnContainer from '../atoms/ColumnContainer';

import defaultImage from '../../assets/images/Avatar.png';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import theme from '../../assets/styles/theme';
import { getTimeDiff } from '../../hooks/useCalculateDateDiff';
import ThumbnailImage from '../atoms/ThumbnailImage';
import { SiteNameElement } from '../atoms/CategoryItem/SiteNameElement';
import { TitleElement } from '../atoms/CategoryItem/TitleElement';
import { ThumbnailElement } from '../atoms/CategoryItem/ThumbnailElement';
import { DescriptionElement } from '../atoms/CategoryItem/DescrptionElement';
import { AuthorImageElement } from '../atoms/CategoryItem/AuthorImageElement';
import { AuthorElement } from '../atoms/CategoryItem/AuthorElement';
import { BlogNameElement } from '../atoms/CategoryItem/BlogNameElement';
import { PublishedDateElement } from '../atoms/CategoryItem/PublishedDateElement';

interface ArticleScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function ArticleScrapCard({ content, showMemoCreateModal, showTooltip }: ArticleScrapCardProps) {
    const varient = 'scrapCard';

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}
        >
            {content.siteName && <SiteNameElement siteName={content.siteName} varient={varient} />}
            {content.title && <TitleElement title={content.title} varient={varient} />}
            {content.thumbnailUrl && <ThumbnailElement thumbnailUrl={content.thumbnailUrl} varient={varient} />}
            <RowContainer
                style={{
                    justifyContent: 'space-between',
                }}>
                <RowContainer
                    style={{
                        gap: '5px',
                    }}>
                    <AuthorImageElement authorImage={content.authorImageUrl} varient={varient} />
                    <ColumnContainer>
                        <AuthorElement author={content.author} varient={varient} />
                        <BlogNameElement blogName={content.blogName} varient={varient} />
                    </ColumnContainer>
                </RowContainer>
                <PublishedDateElement publishedDate={content.publishedDate} varient={varient} />
            </RowContainer>
            {content.description && <DescriptionElement description={content.description} varient={varient} />}
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

const EmpasizedTypography = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
`

const DescriptionTypography = styled(DefaultTypography)`
    overflow: hidden;
    textOverflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    wordWrap: break-word;
`

const TitleTypography = styled(EmpasizedTypography)`
    overflow: hidden;
    textOverflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    wordWrap: break-word;
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
