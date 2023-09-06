import styled from 'styled-components';

import { contentProps } from '../../types/ContentType';
import Memo from './Memo';
import Button from '../atoms/DefaultButton';
import Chip from '../atoms/Chip';
import RowContainer from '../atoms/RowContainer';
import ProfileImage from '../atoms/ProfileImage';
import ColumnContainer from '../atoms/ColumnContainer';

import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import theme from '../../assets/styles/theme';
import defaultImage from '../../assets/images/Avatar.png';
import { getTimeDiff } from '../../hooks/useCalculateDateDiff';
import { SiteNameElement } from '../atoms/CategoryItem/SiteNameElement';
import { TitleElement } from '../atoms/CategoryItem/TitleElement';
import { VideoElement } from '../atoms/CategoryItem/VideoElement';
import { VideoInfosElement } from '../atoms/CategoryItem/VideoInfosElement';
import { ChannelProfileElement } from '../atoms/CategoryItem/ChannelProfileElement';
import { DescriptionElement } from '../atoms/CategoryItem/DescrptionElement';
import { ThumbnailElement } from '../atoms/CategoryItem/ThumbnailElement';
import { Box, Typography } from '@mui/material';
import MemoCreateButton from '../atoms/CategoryItem/MemoCreateButton';
import { ScrapCardSeeMoreIcon } from '../atoms/Icon';
import { AuthorElement } from '../atoms/CategoryItem/AuthorElement';
import { PublishedDateElement } from '../atoms/CategoryItem/PublishedDateElement';
import { ChannelElement } from '../atoms/CategoryItem/ChannelElement';

interface VideoScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function VideoScrapCard({ content, showMemoCreateModal, showTooltip }: VideoScrapCardProps) {
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
            {content.title && <TitleElement title={content.title} varient={varient} />}
            <RowContainer
                style={{
                    gap: '8px',
                }}
            >
                {content.channelImageUrl && <ProfileImage source={content.channelImageUrl} size={20} />}
                <RowContainer>
                    <ChannelElement channelName={content.channelName} varient={varient} />
                    {' • '}
                    <PublishedDateElement publishedDate={content.publishedDate} varient={varient} />
                </RowContainer>
            </RowContainer>
            <ThumbnailElement thumbnailUrl={content.thumbnailUrl} />
            <RowContainer>
                <ColumnContainer
                    style={{
                        gap: '4px',
                        flex: '1',
                    }}
                >
                    <Typography
                        variant='h6'
                        color={theme.color.Gray_070}
                    >
                        조회수
                    </Typography>
                    <Typography
                        variant='h3'
                        color={theme.color.Gray_090}
                        sx={{
                            fontWeight: '600',
                            lineHeight: '150%',
                        }}
                    >
                        {content.watchedCnt}
                    </Typography>
                </ColumnContainer>
                <ColumnContainer
                    style={{
                        gap: '4px',
                        flex: '1',
                    }}
                >
                    <Typography
                        variant='h6'
                        color={theme.color.Gray_070}
                    >
                        영상 길이
                    </Typography>
                    <Typography
                        variant='h3'
                        color={theme.color.Gray_090}
                        sx={{
                            fontWeight: '600',
                            lineHeight: '150%',
                        }}
                    >
                        {content.playTime}
                    </Typography>
                </ColumnContainer>
            </RowContainer>
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

export default VideoScrapCard;
