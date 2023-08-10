import styled from 'styled-components';
import RowContainer from '../atoms/RowContainer';
import ColumnContainer from '../atoms/ColumnContainer';
import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import ThumbnailImage from '../atoms/ThumbnailImage';

interface ExistVideoScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}


function VideoItemSummary({ thumbnailUrl, title, channelName }) {

    return (
        <Card sx={{
            width: '100%',
            boxShadow: 'none',
            borderRadius: '0',
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
        </Card>
    )
}

function ExistVideoScrapContainer({ contents }: ExistVideoScrapContainerProps) {
    return (
        <RowContainer
            style={{
                padding: '20px',
                gap: '10px',
                boxSizing: 'border-box',
                width: '100%',
            }}
        >
            <VideoListWrapper>
                <Typography
                    style={{
                        margin: '0 10px',
                        fontSize: '0.875rem',
                        color: theme.color.icon_color,
                    }}
                >비디오 목록</Typography>
                <VideoList>
                    {contents.map((content) => {
                        const { thumbnailUrl, title, channelName } = content;
                        return <VideoItemSummary thumbnailUrl={thumbnailUrl} title={title} channelName={channelName} />
                    })}
                </VideoList>
            </VideoListWrapper>

        </RowContainer>
    )
}

const VideoList = styled.section`
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`

const VideoListWrapper = styled.div`
    width: 250px;
    background-color: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: ${theme.style.shadow};
`

export default ExistVideoScrapContainer
