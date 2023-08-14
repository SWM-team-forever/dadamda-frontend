import { CardActionArea, Box, Typography, TextareaAutosize } from "@mui/material";
import ThumbnailImage from "../atoms/ThumbnailImage";
import { useSelectedCategoryItem } from "./SelectedCategoryItem";
import theme from "../../assets/styles/theme";
import ColumnContainer from "../atoms/ColumnContainer";
import { contentProps } from "../../types/ContentType";
import { ChangeEvent, useState } from "react";
import { ShortcutIcon, MoreIcon } from "../atoms/Icon";
import Overlay from "../atoms/Overlay";
import RowContainer from "../atoms/RowContainer";
import ScrapDeleteModal from "./ScrapDeleteModal";
import ScrapEditModal from "./ScrapEditModal";
import Tooltip from "../atoms/Tooltip";
import { useDefaultSnackbar } from "../../hooks/useWarningSnackbar";
import { POST_CREATE_MEMO_URL } from "../../secret";
import Memo from "../molcules/Memo";
import styled from "styled-components";

interface MobileProductCategoryItemHorizontal {
    content: contentProps['content'],
}

function MobileProductCategoryItemVertical({ content }: MobileProductCategoryItemHorizontal) {
    const { thumbnailUrl, price } = content;
    const [selectedContent, setSelectedContent] = useSelectedCategoryItem();

    return (
        <div
            style={{
                width: '100%',
                boxShadow: theme.style.shadow,
                backgroundColor: `${selectedContent.scrapId === content.scrapId ? theme.color.background_color : 'white'}`,
            }}
            onClick={() => setSelectedContent(content)}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '5px',
                }}
            >
                <Info content={content} />
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    {thumbnailUrl && <ThumbnailImage thumbnailUrl={thumbnailUrl} />}
                </Box>
                <ColumnContainer
                    style={{
                        width: '100%',
                        padding: '10px',
                        boxSizing: 'border-box',
                        gap: '5px',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            color: theme.color.primary_color,
                            fontWeight: '700',
                            lineHeight: '160%',
                        }}
                    >
                        {price}
                    </Typography>
                    <MemoArea content={content} />
                </ColumnContainer>
            </CardActionArea>
        </div>
    )
}

function Info({ content }: MobileProductCategoryItemHorizontal) {
    const { siteName, title, pageUrl, scrapId } = content;

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

    return (
        <>
            <RowContainer
                style={{
                    gap: '5px',
                    width: '100%',
                    boxSizing: 'border-box',
                    justifyContent: 'space-between',
                    padding: '10px',
                }}>
                <ColumnContainer>
                    <Typography
                        sx={{
                            wordBreak: 'break-all',
                            fontSize: '0.75rem',
                        }}>
                        {siteName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '0.875rem',
                            lineHeight: '120%',
                        }}>
                        {title}
                    </Typography>
                </ColumnContainer>
                <RowContainer style={{ gap: '5px' }}>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        window.open(`${pageUrl}`);
                    }}>
                        <ShortcutIcon size='24' fill={theme.color.icon_color} />
                    </div>
                    <div
                        onClick={() => showTooltip()}
                        style={{
                            position: 'relative',
                            height: 'fit-content',
                        }}
                    >
                        <MoreIcon size='24' fill={theme.color.icon_color} />
                        {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
                    </div>
                </RowContainer>
            </RowContainer>
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} setError={setError} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={scrapId} setError={setError} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible) && <Overlay />}
        </>
    )
}

function MemoArea({ content }: MobileProductCategoryItemHorizontal) {
    const { scrapId, memoList } = content;
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    let createdMemoCount = 0;

    function onEnterPress(e: any) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            createMemo();
            createdMemoCount += 1;
            const changedMemoList = [...content.memoList, {
                memoId: -1 * createdMemoCount,
                memoText: e.target.value,
            }];
            // setSelectedContent({ ...content, memoList: changedMemoList });
            e.target.value = '';
        }
    }

    function createMemo() {
        const token = localStorage.getItem('token');
        token &&
            fetch(POST_CREATE_MEMO_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
                body: JSON.stringify({
                    scrapId: scrapId,
                    memoText: textAreaValue,
                }),
            }).then((response) => {
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
                .then(() => {
                    useDefaultSnackbar('메모가 추가되었습니다.', 'success');
                })
        // .catch(err => setError(err.message));
    }

    return (
        <>
            {
                memoList?.map((memo) => {
                    return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
                })
            }
            <div
                style={{
                    width: '100%',
                }}>
                <StyledTextArea placeholder='메모를 입력해주세요.' minRows={4} onKeyDown={onEnterPress} onChange={e => handleSetValue(e)} />
            </div>
        </>
    )
}

const StyledTextArea = styled(TextareaAutosize)`
    line-height: 1.2;
    resize: none;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    background: ${theme.color.background_color};
    border: none;
    border-radius: 4px;
    padding: 10px;
`;

export default MobileProductCategoryItemVertical;
