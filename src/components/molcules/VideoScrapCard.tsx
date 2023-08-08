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

interface VideoScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function VideoScrapCard({ content, showMemoCreateModal, showTooltip }: VideoScrapCardProps) {

    const videoMenus = [{
        title: '게시일',
        content: content.publishedDate,
    }, {
        title: '조회수',
        content: content.watchedCnt,
    }, {
        title: '영상 길이',
        content: content.playTime,
    },]

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}>
            {content.siteName && <Chip>{content.siteName}</Chip>}
            {content.title && <EmpasizedTypography>{content.title}</EmpasizedTypography>}
            <VideoPlayer src={content.embedUrl} />
            {
                content.channelName &&
                <RowContainer style={{ alignItems: 'center', gap: '5px' }}>
                    {content.channelImageUrl ? <ProfileImage size={24} source={content.channelImageUrl} /> : <ProfileImage size={24} source={defaultImage} />}
                    <DefaultTypography>{content.channelName}</DefaultTypography>
                </RowContainer>
            }
            <RowContainer style={{ justifyContent: 'space-between' }}>
                {videoMenus.map(menu => {
                    return (
                        <>
                            {menu.content &&
                                <ColumnContainer style={{ alignItems: 'center', flex: '1' }}>
                                    <EmpasizedTypography>{
                                        typeof (menu.content) === 'number' ? getTimeDiff(menu.content) : menu.content
                                    }</EmpasizedTypography>
                                    <DefaultTypography>{menu.title}</DefaultTypography>
                                </ColumnContainer>
                            }
                        </>
                    )
                })}
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

const VideoPlayer = styled.iframe`
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

export default VideoScrapCard;
