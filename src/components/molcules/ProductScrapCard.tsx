import styled from 'styled-components';

import { contentProps } from '../../types/ContentType';
import theme from '../../assets/styles/theme';

import { Box } from '@mui/material';
import Memo from './Memo';
import { SiteNameElement } from '../atoms/CategoryItem/SiteNameElement';
import { TitleElement } from '../atoms/CategoryItem/TitleElement';
import { ThumbnailElement } from '../atoms/CategoryItem/ThumbnailElement';
import { PriceElement } from '../atoms/CategoryItem/PriceElement';
import { ScrapCardSeeMoreIcon } from '../atoms/Icon';
import MemoCreateButton from '../atoms/CategoryItem/MemoCreateButton';

interface ProductScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function ProductScrapCard({ content, showMemoCreateModal, showTooltip }: ProductScrapCardProps) {
    const varient = 'scrapCard';

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}>
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
            {content.thumbnailUrl && <ThumbnailElement thumbnailUrl={content.thumbnailUrl} />}
            {content.title && <TitleElement title={content.title} varient={varient} />}
            {content.price && <PriceElement price={content.price} varient={varient} />}
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

export default ProductScrapCard;
