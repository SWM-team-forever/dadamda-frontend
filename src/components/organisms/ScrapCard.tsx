import styled from 'styled-components';
import { useState } from 'react';

import Tooltip from '../atoms/Tooltip';
import ScrapEditModal from './ScrapEditModal';
import ScrapDeleteModal from './ScrapDeleteModal';
import MemoCreateModal from './MemoCreateModal';
import OtherScrapCard from '../molcules/OtherScrapCard';
import ProductScrapCard from '../molcules/ProductScrapCard';
import VideoScrapCard from '../molcules/VideoScrapCard';
import ArticleScrapCard from '../molcules/ArticleScrapCard';

import theme from '../../assets/styles/theme';

function ScrapCard({ content }) {
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

    function matchCardType(dtype) {
        switch (dtype) {
            case 'other':
                return <OtherScrapCard content={content} showMemoCreateModal={showMemoCreateModal} showTooltip={showTooltip} />;
            case 'product':
                return <ProductScrapCard content={content} showMemoCreateModal={showMemoCreateModal} showTooltip={showTooltip} />;
            case 'video':
                return <VideoScrapCard content={content} showMemoCreateModal={showMemoCreateModal} showTooltip={showTooltip} />;
            case 'article':
                return <ArticleScrapCard content={content} showMemoCreateModal={showMemoCreateModal} showTooltip={showTooltip} />;
            default:
                return <OtherScrapCard content={content} showMemoCreateModal={showMemoCreateModal} showTooltip={showTooltip} />;
        }
    }

    return (
        <CardContainer>
            {matchCardType(content.dtype)}
            {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={content.scrapId} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible || isMemoCreateModalVisible) && <Overlay />}
            {isMemoCreateModalVisible && <MemoCreateModal hideMemoCreateModal={hideMemoCreateModal} scrapId={content.scrapId} />}
        </CardContainer>
    )
}

const CardContainer = styled.div`
    position: relative;
    border-radius: 4px;
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

export default ScrapCard;