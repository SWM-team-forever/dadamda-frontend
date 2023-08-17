import { useState } from "react";
import theme from "../../../assets/styles/theme";
import ScrapDeleteModal from "../../organisms/ScrapDeleteModal";
import ScrapEditModal from "../../organisms/ScrapEditModal";
import { ShortcutIcon, MoreIcon } from "../Icon";
import Overlay from "../Overlay";
import RowContainer from "../RowContainer";
import Tooltip from "../Tooltip";
import { contentProps } from "../../../types/ContentType";

interface IconButtonListElementProps {
    content: contentProps['content'],
}

export function IconButtonListElement({ content }: IconButtonListElementProps) {
    const { pageUrl, scrapId } = content;

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

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [isScrapEditModalVisible, setIsScrapEditModalVisible] = useState(false);
    const [isScrapDeleteModalVisible, setIsScrapDeleteModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function TooltipOverlay() {
        return (
            <div style={{
                width: '100vw',
                height: '100vh',
                background: 'transparent',
                position: 'fixed',
                top: '0',
                left: '0',
            }
            }
                onClick={(e) => {
                    e.stopPropagation();
                    hideTooltip();
                }}>
            </div >
        )
    }

    return (
        <>
            <RowContainer style={{ gap: '5px' }}>
                <div onClick={(e) => {
                    e.stopPropagation();
                    window.open(`${pageUrl}`);
                }}>
                    <ShortcutIcon size='24' fill={theme.color.icon_color} />
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        showTooltip()
                    }}
                    style={{
                        position: 'relative',
                        height: 'fit-content',
                    }}
                >
                    <MoreIcon size='24' fill={theme.color.icon_color} />
                    {isTooltipVisible &&
                        <>
                            <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />
                            <TooltipOverlay />
                        </>
                    }
                </div>
            </RowContainer>
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} setError={setError} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={scrapId} setError={setError} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible) && <Overlay />}
        </>
    )
}