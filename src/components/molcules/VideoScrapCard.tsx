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
            {content.siteName && <SiteNameElement siteName={content.siteName} varient={varient} />}
            {content.title && <TitleElement title={content.title} varient={varient} />}
            <ThumbnailElement thumbnailUrl={content.thumbnailUrl} />
            <ChannelProfileElement channelImageUrl={content.channelImageUrl} channelName={content.channelName} varient={varient} />
            <VideoInfosElement publishedDate={content.publishedDate} watchedCnt={content.watchedCnt} playTime={content.playTime} varient={varient} />
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

const VideoPlayer = styled.iframe`
            border-radius: 4px;
            `

const EmpasizedTypography = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
    overflow: hidden;
    textOverflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    wordWrap: break-word;
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

const ButtonContainer = styled.div`
display: flex;
align-items: center;
`

const MoreIconContainer = styled.img`
            width: 24px;
            height: 24px;
            cursor: pointer;
            `

export default VideoScrapCard;
