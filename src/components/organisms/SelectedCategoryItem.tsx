import { TextareaAutosize, Typography } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import theme from '../../assets/styles/theme';
import ColumnContainer from '../atoms/ColumnContainer';
import { ShortcutIcon, MoreIcon } from '../atoms/Icon';
import RowContainer from '../atoms/RowContainer';
import ProfileImage from '../atoms/ProfileImage';
import { getTimeDiff } from '../../hooks/useCalculateDateDiff';
import Memo from '../molcules/Memo';
import styled from 'styled-components';
import { POST_CREATE_MEMO_URL } from '../../secret';
import { useDefaultSnackbar } from '../../hooks/useWarningSnackbar';
import Tooltip from '../atoms/Tooltip';
import ScrapEditModal from './ScrapEditModal';
import ScrapDeleteModal from './ScrapDeleteModal';
import Overlay from '../atoms/Overlay';

const SelectedCategoryItemContext = createContext();

function SelectedCategoryItemProvider({ children }) {
    const selectedContentState = useState({});

    return (
        <SelectedCategoryItemContext.Provider value={selectedContentState}>
            {children}
        </SelectedCategoryItemContext.Provider>
    )
}

export function useSelectedCategoryItem() {
    const context = useContext(SelectedCategoryItemContext);
    if (context === undefined) {
        throw new Error('useSelectedCategoryItem must be used within SelectedCategoryItemContextProvider');
    }

    return context;
}

function Video() {
    const [selectedContent] = useSelectedCategoryItem();
    const embedUrl = selectedContent.embedUrl;

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
            }}>
            <iframe src={embedUrl}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }} />
        </div>
    );
}

function Header() {
    const [selectedContent] = useSelectedCategoryItem();
    const { siteName, title, pageUrl } = selectedContent;

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
                }}>
                <ColumnContainer>
                    <Typography
                        sx={{
                            wordBreak: 'break-all',
                        }}>
                        {siteName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
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
                    <div onClick={() => showTooltip()}>
                        <MoreIcon size='24' fill={theme.color.icon_color} />
                    </div>
                </RowContainer>
            </RowContainer>
            {isTooltipVisible && <Tooltip contents={scrapCardMenu} color={theme.color.background_color} />}
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={selectedContent} setError={setError} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={selectedContent.scrapId} setError={setError} />}
            {(isScrapEditModalVisible || isScrapDeleteModalVisible) && <Overlay />}
        </>
    )
}

function Channel() {
    const [selectedContent] = useSelectedCategoryItem();
    const { channelImageUrl, channelName } = selectedContent;

    return (
        <RowContainer
            style={{
                gap: '10px',
            }}>
            <ProfileImage size={24} source={channelImageUrl} />
            <Typography>{channelName}</Typography>
        </RowContainer>
    )
}

function Infos() {
    const [selectedContent] = useSelectedCategoryItem();
    const { publishedDate, watchedCnt, playTime } = selectedContent;

    const videoMenus = [{
        title: '게시일',
        content: publishedDate,
    }, {
        title: '조회수',
        content: watchedCnt,
    }, {
        title: '영상 길이',
        content: playTime,
    },]
    return (
        <RowContainer style={{ justifyContent: 'space-between' }}>
            {videoMenus.map(menu => {
                return (
                    <>
                        {menu.content &&
                            <ColumnContainer style={{ alignItems: 'center', flex: '1' }}>
                                <Typography>{
                                    typeof (menu.content) === 'number' ? getTimeDiff(menu.content) : menu.content
                                }</Typography>
                                <Typography>{menu.title}</Typography>
                            </ColumnContainer>
                        }
                    </>
                )
            })}
        </RowContainer>
    )
}

function Description() {
    const [selectedContent] = useSelectedCategoryItem();
    const { description } = selectedContent;

    return (
        <RowContainer
            style={{
                width: '100%',
                whiteSpace: 'pre-wrap',
            }}>
            {description}
        </RowContainer>
    )
}

function MemoArea() {
    const [selectedContent] = useSelectedCategoryItem();
    const { scrapId, memoList } = selectedContent;
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleSetValue = (e) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    function onEnterPress(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            createMemo();
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
                memoList?.map(memo => {
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

SelectedCategoryItemProvider.Video = Video;
SelectedCategoryItemProvider.Header = Header;
SelectedCategoryItemProvider.Channel = Channel;
SelectedCategoryItemProvider.Infos = Infos;
SelectedCategoryItemProvider.Description = Description;
SelectedCategoryItemProvider.MemoArea = MemoArea;

export default SelectedCategoryItemProvider;