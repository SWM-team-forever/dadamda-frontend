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

interface OtherScrapCardProps {
    content: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailUrl: string,
        scrapCreatedDate: string,
        scrapId: number,
        memoList: [{
            memoId: number,
            memoImageURL?: string,
            memoText?: string,
        }],
    }
}

function OtherScrapCard({ content }: OtherScrapCardProps) {
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

    return (
        <CardContainer>
            <CardWrapper>
                <CardImage src={content.thumbnailUrl} />
                <CardInfoWrapper>
                    <EmpasizedTypography>{content.title}</EmpasizedTypography>
                    <DefaultTypography>{content.description}</DefaultTypography>
                </CardInfoWrapper>
                {content.memoList.map(memo => {
                    return <Memo memoImageURL={memo.memoImageURL} memoText={memo.memoText} />
                })}
                <ButtonContainer>
                    <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound onClick={showMemoCreateModal} />
                    <MoreIconContainer src={MoreIcon} onClick={() => showTooltip()} />
                </ButtonContainer>
            </CardWrapper>
            {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} scrapId={content.scrapId} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={content.scrapId} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible || isMemoCreateModalVisible) && <Overlay />}
            {isMemoCreateModalVisible && <MemoCreateModal hideMemoCreateModal={hideMemoCreateModal} scrapId={content.scrapId} />}
        </CardContainer>
    );
}

const CardContainer = styled.div`
    position: relative;
`

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
    height: 140px;
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
`

const DefaultTypography = styled.span`
    font-size: 14px;
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
export default OtherScrapCard;