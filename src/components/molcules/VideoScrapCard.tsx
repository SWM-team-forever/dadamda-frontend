import styled from 'styled-components';
import { useState } from 'react';

import Button from '../atoms/DefaultButton';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import Tooltip from '../atoms/Tooltip';
import theme from '../../assets/styles/theme';
import ScrapEditModal from '../organisms/ScrapEditModal';
import ScrapDeleteModal from '../organisms/ScrapDeleteModal';
import MemoCreateModal from '../organisms/MemoCreateModal';
import Memo from './Memo';
import Chip from '../atoms/Chip';
import RowContainer from '../atoms/RowContainer';
import ProfileImage from '../atoms/ProfileImage';
import ColumnContainer from '../atoms/ColumnContainer';
import defaultImage from '../../assets/images/Avatar.png';

interface VideoScrapCardProps {
    content: {
        scrapId: number,
        description?: string,
        pageUrl: string,
        siteName?: string,
        thumbnailUrl: string,
        title?: string,
        memoList?: [
            {
                memoId: number,
                memoText?: string,
                memoImageUrl?: string,
            }
        ],
        channelImageUrl?: string,
        channelName?: string,
        embedUrl: string,
        playTime: string,
        watchedCnt: string,
        publishedDate: string,
    }
}

function VideoScrapCard({ content }: VideoScrapCardProps) {
    const scrapCardMenu = [{
        name: '카드 수정하기',
        onClick: () => {
            hideTooltip();
            showScrapEditModal();
        },
    }, {
        name: '카드 삭제하기',
        onClick: () => {
            hideTooltip();
            showScrapDeleteModal();
        },
    }];

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isScrapEditModalVisible, setIsScrapEditModalVisible] = useState(false);
    const [isScrapDeleteModalVisible, setIsScrapDeleteModalVisible] = useState(false);
    const [isMemoCreateModalVisible, setIsMemoCreateModalVisible] = useState(false);

    function showTooltip() {
        setIsTooltipVisible(true);
    }

    function hideTooltip() {
        setIsTooltipVisible(false);
    }

    function showScrapEditModal() {
        setIsScrapEditModalVisible(true);
    }

    function hideScrapEditModal() {
        setIsScrapEditModalVisible(false);
    }

    function showScrapDeleteModal() {
        setIsScrapDeleteModalVisible(true);
    }

    function hideScrapDeleteModal() {
        setIsScrapDeleteModalVisible(false);
    }

    function showMemoCreateModal() {
        setIsMemoCreateModalVisible(true);
    }

    function hideMemoCreateModal() {
        setIsMemoCreateModalVisible(false);
    }

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
        <CardContainer>
            <CardWrapper>
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
                                    <ColumnContainer style={{ alignItems: 'center' }}>
                                        <EmpasizedTypography>{menu.content}</EmpasizedTypography>
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
                    <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound onClick={showMemoCreateModal} />
                    <MoreIconContainer src={MoreIcon} onClick={() => showTooltip()} />
                </ButtonContainer>
            </CardWrapper>
            {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={content.scrapId} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible || isMemoCreateModalVisible) && <Overlay />}
            {isMemoCreateModalVisible && <MemoCreateModal hideMemoCreateModal={hideMemoCreateModal} scrapId={content.scrapId} />}
        </CardContainer>
    );
}

const CardContainer = styled.div`
    position: relative;
    border-radius: 4px;
`

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

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
`
export default VideoScrapCard;