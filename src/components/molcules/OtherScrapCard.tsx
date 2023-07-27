import styled from 'styled-components';
import { useState } from 'react';

import Button from '../atoms/DefaultButton';
import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import Tooltip from '../atoms/Tooltip';
import theme from '../../assets/styles/theme';
import ScrapEditModal from '../organisms/ScrapEditModal';
import ScrapDeleteModal from '../organisms/ScrapDeleteModal';

interface OtherScrapCardProps {
    content: {
        pageUrl: string,
        title: string,
        description: string,
        thumbnailUrl: string,
        scrapCreatedDate: string,
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

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'SHOW':
                return true;
            case 'HIDE':
                return false;
            default:
                return state;
        }
    }

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

    return (
        <CardContainer>
            <CardWrapper>
                <CardImage src={content.thumbnailUrl} />
                <CardInfoWrapper>
                    <EmpasizedTypography>{content.title}</EmpasizedTypography>
                    <DefaultTypography>{content.description}</DefaultTypography>
                </CardInfoWrapper>
                <ButtonContainer>
                    <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound />
                    <MoreIconContainer src={MoreIcon} onClick={() => showTooltip()} />
                </ButtonContainer>
            </CardWrapper>
            {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible) && <Overlay />}
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