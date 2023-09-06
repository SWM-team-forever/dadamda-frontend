import styled from 'styled-components';

import Memo from './Memo';
import Button from '../atoms/DefaultButton';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';

import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import ThumbnailImage from '../atoms/ThumbnailImage';
import { TitleElement } from '../atoms/CategoryItem/TitleElement';
import { DescriptionElement } from '../atoms/CategoryItem/DescrptionElement';
import MemoCreateButton from '../atoms/CategoryItem/MemoCreateButton';
import { Box } from '@mui/material';
import { ScrapCardSeeMoreIcon } from '../atoms/Icon';

interface OtherScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function OtherScrapCard({ content, showMemoCreateModal, showTooltip }: OtherScrapCardProps) {
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
                    justifyContent: 'flex-end',
                }}
            >
                <ScrapCardSeeMoreIcon width='16' height='16' fill='#24292E' />
            </Box>
            {content.thumbnailUrl && <ThumbnailImage thumbnailUrl={content.thumbnailUrl} />}
            <CardInfoWrapper>
                {content.title && <TitleElement title={content.title} varient={varient} />}
                {content.description && <DescriptionElement description={content.description} varient={varient} />}
            </CardInfoWrapper>
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

const CardInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
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
