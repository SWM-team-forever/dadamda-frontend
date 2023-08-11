import styled from 'styled-components';
import RowContainer from '../atoms/RowContainer';
import ColumnContainer from '../atoms/ColumnContainer';
import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import { Autocomplete, Box, Card, CardActionArea, CardContent, CardMedia, TextareaAutosize, Typography } from '@mui/material';
import ThumbnailImage from '../atoms/ThumbnailImage';
import IconButton from '../atoms/IconButton';
import { MoreIcon, ShortcutIcon } from '../atoms/Icon';
import ProfileImage from '../atoms/ProfileImage';
import { getTimeDiff } from '../../hooks/useCalculateDateDiff';
import Memo from '../molcules/Memo';
import Button from '../atoms/DefaultButton';

interface ExistVideoScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}


function VideoItemSummary({ thumbnailUrl, title, channelName, focusedContent }) {

    return (
        <div
            style={{
                width: '100%',
                boxShadow: 'none',
                borderRadius: '0',
                display: 'block',
            }}>
            <CardActionArea
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '5px',
                    padding: '10px',
                }}
            >
                <Box
                    sx={{
                        width: '30%'
                    }}>
                    <ThumbnailImage thumbnailUrl={thumbnailUrl} />
                </Box>
                <CardContent sx={{
                    width: '70%',
                    padding: '0',
                }}>
                    <Typography gutterBottom component="div" color='text.primary' noWrap
                        sx={{
                            lineHeight: '120%',
                            fontSize: '0.75rem',
                        }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap
                        sx={{
                            fontSize: '0.625rem',
                        }}
                    >
                        {channelName}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </div>
    )
}

function FocusedVideoItem({ focusedContent }: contentProps['content']) {

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
            }}>
            <iframe src={focusedContent.embedUrl}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }} />
        </div>
    );
}

function ExistVideoScrapContainer({ contents }: ExistVideoScrapContainerProps) {
    return (
        <RowContainer
            style={{
                padding: '0 20px',
                gap: '10px',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
            }}
        >
            <VideoListWrapper>
                <VideoList>
                    {contents.map((content) => {
                        const { thumbnailUrl, title, channelName } = content;
                        return <VideoItemSummary thumbnailUrl={thumbnailUrl} title={title} channelName={channelName} focusedContent={contents[0]} />
                    })}
                </VideoList>
                <MemoContainer focusedContent={contents[3]} />
            </VideoListWrapper>
            <Card sx={{
                width: '100%',
                height: 'fit-content',
                marginBottom: '20px',
            }}>
                <FocusedVideoItem focusedContent={contents[1]} />
                <FocusedVideoItemDetails focusedContent={contents[1]} />
            </Card>
        </RowContainer >
    )
}

function FocusedVideoItemDetails({ focusedContent }) {
    const videoMenus = [{
        title: '게시일',
        content: focusedContent.publishedDate,
    }, {
        title: '조회수',
        content: focusedContent.watchedCnt,
    }, {
        title: '영상 길이',
        content: focusedContent.playTime,
    },]
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                padding: '30px',
                boxSizing: 'border-box',
                width: '100%',
                background: 'white',
            }}>
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
                        {focusedContent.siteName}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.25rem',
                            lineHeight: '120%',
                        }}>
                        {focusedContent.title}
                    </Typography>
                </ColumnContainer>
                <RowContainer style={{ gap: '5px' }}>
                    <ShortcutIcon size='24' fill={theme.color.icon_color} />
                    <MoreIcon size='24' fill={theme.color.icon_color} />
                </RowContainer>
            </RowContainer>
            <RowContainer
                style={{
                    gap: '10px',
                }}>
                <ProfileImage size={24} source={focusedContent.channelImageUrl} />
                <Typography>{focusedContent.channelName}</Typography>
            </RowContainer>
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
            <RowContainer
                style={{
                    width: '100%',
                    whiteSpace: 'pre-wrap',
                }}>
                {focusedContent.description}
            </RowContainer>
        </ColumnContainer>
    )
}

function MemoContainer({ focusedContent }) {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '10px',
                height: 'calc(50% - 5px)',
                width: '100%',
                overflow: 'auto',
                boxSizing: 'border-box',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
            }}>
            {
                focusedContent.memoList?.map(memo => {
                    return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
                })
            }
            < EditText placeholder="메모를 입력해주세요." onChange={() => console.log('hi')} />
            <TextareaAutosize placeholder='메모를 입력해주세요.' />
        </ColumnContainer >
    )
}

const VideoList = styled.section`
    width: 100%;
    height: calc(50% - 5px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: ${theme.style.shadow};
    border-radius: 4px;
    overflow: auto;
`

const VideoListWrapper = styled.div`
    width: 400px;
    padding: 0 10px;
    height: calc(100% - 74px);
    overflow: auto;
    box-sizing: border-box;
    position: sticky;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const EditText = styled.textarea`
    font-size: 12px;
    border-radius: 4px;
    padding: 15px;
    background-color: ${theme.color.background_color};
    border: none;
    width: 100%;
    box-sizing: border-box;
    resize: none;
`

export default ExistVideoScrapContainer
