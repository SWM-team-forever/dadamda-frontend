import styled from 'styled-components';
import RowContainer from '../atoms/RowContainer';
import ColumnContainer from '../atoms/ColumnContainer';
import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import ThumbnailImage from '../atoms/ThumbnailImage';
import { useSelectedCategoryItem } from './SelectedCategoryItem';
import { useCallback, useEffect } from 'react';
import SelectedCategoryItemProvider from './SelectedCategoryItem';

interface ExistVideoScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}


function VideoItemSummary({ content }) {
    const { thumbnailUrl, title, channelName } = content;
    const [, setSelectedContent] = useSelectedCategoryItem();

    return (
        <div
            style={{
                width: '100%',
                boxShadow: 'none',
                borderRadius: '0',
                display: 'block',
            }}
            onClick={() => setSelectedContent(content)}
        >
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

function ExistVideoScrapContainer({ contents }: ExistVideoScrapContainerProps) {
    const [selectedContent, setSelectedContent] = useSelectedCategoryItem();
    const initiateSelectedContent = useCallback(() => {
        setSelectedContent(contents[0]);
    }, [contents]);

    useEffect(() => {
        initiateSelectedContent();
    }, []);

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
                        return <VideoItemSummary content={content} />
                    })}
                </VideoList>
                <MemoContainer />
            </VideoListWrapper>
            <Card sx={{
                width: '100%',
                height: 'fit-content',
                marginBottom: '20px',
            }}>
                <FocusedVideoItem />
                <FocusedVideoItemDetails />
            </Card>
        </RowContainer >
    )
}

function FocusedVideoItem() {

    return (
        <SelectedCategoryItemProvider.Video />
    );
}

function FocusedVideoItemDetails() {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                padding: '30px',
                boxSizing: 'border-box',
                width: '100%',
                background: 'white',
            }}>
            <SelectedCategoryItemProvider.Header />
            <SelectedCategoryItemProvider.Channel />
            <SelectedCategoryItemProvider.Infos />
            <SelectedCategoryItemProvider.Description />
        </ColumnContainer>
    )
}

function MemoContainer() {
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
            <SelectedCategoryItemProvider.MemoArea />
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


export default ExistVideoScrapContainer
