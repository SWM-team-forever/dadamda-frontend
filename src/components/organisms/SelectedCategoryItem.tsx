import { TextareaAutosize, Typography } from '@mui/material';
import { createContext, useContext, useState } from 'react';
import theme from '../../assets/styles/theme';
import ColumnContainer from '../atoms/ColumnContainer';
import { ShortcutIcon, MoreIcon } from '../atoms/Icon';
import RowContainer from '../atoms/RowContainer';
import ProfileImage from '../atoms/ProfileImage';
import { getTimeDiff } from '../../hooks/useCalculateDateDiff';
import Memo from '../molcules/Memo';

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
    const { siteName, title } = selectedContent;

    return (
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
                <ShortcutIcon size='24' fill={theme.color.icon_color} />
                <MoreIcon size='24' fill={theme.color.icon_color} />
            </RowContainer>
        </RowContainer>
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
    const { memoList } = selectedContent;

    return (
        <>
            {
                memoList?.map(memo => {
                    return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
                })
            }
            {/* <EditText placeholder="메모를 입력해주세요." onChange={() => console.log('hi')} /> */}
            <TextareaAutosize placeholder='메모를 입력해주세요.' />
        </>
    )
}

SelectedCategoryItemProvider.Video = Video;
SelectedCategoryItemProvider.Header = Header;
SelectedCategoryItemProvider.Channel = Channel;
SelectedCategoryItemProvider.Infos = Infos;
SelectedCategoryItemProvider.Description = Description;
SelectedCategoryItemProvider.MemoArea = MemoArea;

export default SelectedCategoryItemProvider;