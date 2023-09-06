import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';

import Tooltip from '../atoms/Tooltip';
import ScrapEditModal from './ScrapEditModal';
import ScrapDeleteModal from './ScrapDeleteModal';
import MemoCreateModal from './MemoCreateModal';
import OtherScrapCard from '../molcules/OtherScrapCard';
import ProductScrapCard from '../molcules/ProductScrapCard';
import VideoScrapCard from '../molcules/VideoScrapCard';
import ArticleScrapCard from '../molcules/ArticleScrapCard';
import ErrorHandler from '../../utility/ErrorHandler';

import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';

function ScrapCard({ content }: contentProps) {
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
    const [error, setError] = useState<string | null>(null);

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

    content = {
        ...content,
        title: decode(content.title, { level: 'html5' }),
        description: decode(content.description, { level: 'html5' })
    }

    function matchCardType(dtype: string) {
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
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} setError={setError} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={content.scrapId} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible || isMemoCreateModalVisible) && <Overlay />}
            {isMemoCreateModalVisible && <MemoCreateModal hideMemoCreateModal={hideMemoCreateModal} scrapId={content.scrapId} setError={setError} />}
            {error && <ErrorHandler error={error} setError={setError} />}
        </CardContainer>
    )
}

const CardContainer = styled.div`
    position: relative;
    word-break: break-all;
    border-radius: 8px;
    background: ${theme.color.Gray_020}
    box-shadow: 0px 2px 16px 0px rgba(19, 48, 74, 0.08);
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