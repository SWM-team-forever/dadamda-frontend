import styled from 'styled-components';

import { Box } from '@mui/material';

import theme from '@/assets/styles/theme';
import { contentProps } from '@/types/ContentType';
import { AuthorElement } from '@/components/atoms/CategoryItem/AuthorElement';
import { DescriptionElement } from '@/components/atoms/CategoryItem/DescrptionElement';
import MemoCreateButton from '@/components/atoms/CategoryItem/MemoCreateButton';
import { PublishedDateElement } from '@/components/atoms/CategoryItem/PublishedDateElement';
import { SiteNameElement } from '@/components/atoms/CategoryItem/SiteNameElement';
import { ThumbnailElement } from '@/components/atoms/CategoryItem/ThumbnailElement';
import { TitleElement } from '@/components/atoms/CategoryItem/TitleElement';
import { ScrapCardSeeMoreIcon } from '@/components/atoms/Icon';
import ProfileImage from '@/components/atoms/ProfileImage';
import RowContainer from '@/components/atoms/RowContainer';
import Memo from '@/components/molcules/Memo';


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
            <Box
                component='div'
                onClick={
                    (e) => {
                        e.stopPropagation();
                        showTooltip();
                    }}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {content.siteName && <SiteNameElement siteName={content.siteName} varient={varient} />}
                <ScrapCardSeeMoreIcon width='16' height='16' fill='#24292E' />
            </Box>
            {content.thumbnailUrl && <ThumbnailElement thumbnailUrl={content.thumbnailUrl} varient={varient} />}
            <RowContainer
                style={{
                    gap: '8px',
                }}
            >
                {content.authorImageUrl && <ProfileImage source={content.authorImageUrl} size={20} />}
                <RowContainer>
                    <AuthorElement author={content.author} varient={varient} />
                    {' • '}
                    <AuthorElement author={content.blogName} varient={varient} />
                    {' • '}
                    <PublishedDateElement publishedDate={content.publishedDate} varient={varient} />
                </RowContainer>
            </RowContainer>
            {content.title && <TitleElement title={content.title} varient={varient} />}
            {content.description && <DescriptionElement description={content.description} varient={varient} />}
            {content.memoList?.map(memo => {
                return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
            })}
            <Box
                component='div'
                onClick={
                    (e) => {
                        e.stopPropagation();
                    }}
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <MemoCreateButton showMemoCreateModal={showMemoCreateModal} />
            </Box>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${theme.color.Gray_020};
    border-radius: 8px;
    box-shadow: 0px 2px 16px 0px rgba(19, 48, 74, 0.08); 
`
export default ArticleScrapCard;
