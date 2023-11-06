import theme from '@/assets/styles/theme';
import TrendingCard, { TrendingCardProps } from '@/components/molcules/Trending/TrendingCard';
import { useTrendingAtom } from '@/hooks/useTrendingAtom';
import { TabContext } from '@mui/lab';
import { Box, Button, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import { trendingMockData } from '__mocks__/trendingMockData';
import { useState, SyntheticEvent } from 'react';
import styled from 'styled-components';

const category = {
    LIST: {
        text: '전체',
        value: 'LIST',
    },
    ENTERTAINMENT_ART: {
        text: '엔터테인먼트/예술',
        value: 'ENTERTAINMENT_ART',
    },
    HOBBY_TRAVEL: {
        text: '취미/여가/여행',
        value: 'HOBBY_TRAVEL',
    },
    LIFE_SHOPPING: {
        text: '생활/노하우/쇼핑',
        value: 'LIFE_SHOPPING',
    },
    KNOWLEDGE_TREND: {
        text: '지식/동향',
        value: 'KNOWLEDGE_TREND',
    },
}

function TrendingPage() {
    function Topic() {
        const { trending, setTrending } = useTrendingAtom();
        const handleClickTopic = (value: string) => {
            setTrending({ ...trending, tag: value });
        }

        const isValueSelected = (value: string) => {
            return trending.tag === value;
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    maxWidth: '230px',
                    width: '100%',
                    p: '12px',
                    boxSizing: 'border-box',
                    position: 'fixed',
                }}
            >
                <Typography
                    sx={{
                        color: theme.color.text_gray_color,
                        fontSize: '14px',
                        lineHeight: '150%',
                        fontWeight: '600',
                    }}
                >
                    토픽
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        backgroundColor: theme.color.Gray_020,
                        borderRadius: '8px',
                        p: '16px',
                        boxSizing: 'border-box',
                    }}
                >
                    {Object.values(category).map((item: any, index: number) => {
                        return <Button
                            key={index}
                            sx={{
                                color: isValueSelected(item.value) ? theme.color.Gray_090 : theme.color.Gray_080,
                                fontSize: '14px',
                                lineHeight: '150%',
                                fontWeight: isValueSelected(item.value) ? '600' : '400',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                minWidth: '0',
                                width: '100%',
                                justifyContent: 'flex-start',
                                backgroundColor: isValueSelected(item.value) ? theme.color.Gray_030 : 'transparent',
                            }}
                            onClick={() => handleClickTopic(item.value)}
                        >
                            {item.text}
                        </Button>
                    }
                    )}
                </Box>
            </Box>
        )
    }

    function HorizontalTopic() {
        const { trending, setTrending } = useTrendingAtom();
        const handleTabValueChange = (_event: SyntheticEvent<Element, Event>, newValue: string) => {
            setTrending({ ...trending, tag: newValue });
        }

        return (
            <TabContext value={trending.tag}>
                <Tabs value={trending.tag} onChange={handleTabValueChange}
                    sx={{
                        '& .MuiButtonBase-root': {
                            minHeight: 'auto',
                            color: theme.color.Gray_080,
                            fontWeight: '400',
                            fontSize: '14px',
                        },
                        '& .Mui-selected': {
                            color: theme.color.Blue_080,
                            fontWeight: '600'
                        },
                        minHeight: 'auto',
                    }}
                    scrollButtons="auto"
                    variant="scrollable"
                >
                    {Object.values(category).map((item: any, index: number) => {
                        return <Tab
                            key={index}
                            value={item.value}
                            label={item.text}
                            sx={{
                                minWidth: 'auto',
                                justifyContent: 'flex-start',
                            }}
                        />
                    }
                    )}
                </Tabs>
                <Divider />
            </TabContext>
        )
    }

    return (
        <PageWrapper>
            <Box
                gridTemplateColumns='3fr 7fr 3fr'
                columnGap='24px'
                display={{
                    xs: 'block',
                    md: 'grid',
                }}
                sx={{
                    height: '100%',
                }}
            >
                <Grid item
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'flex',
                        },
                        maxWidth: '100%',
                        justifyContent: 'end',
                        pt: '20px',
                    }}
                >
                    <Topic />
                </Grid>
                <Grid item
                    sx={{
                        p: '20px 0',
                    }}
                >
                    <HorizontalTopic />
                    {trendingMockData.map((data: TrendingCardProps, index: number) => (
                        <TrendingCard
                            key={index}
                            profileUrl={data.profileUrl}
                            nickname={data.nickname}
                            title={data.title}
                            description={data.description}
                            tag={data.tag}
                            heartCnt={data.heartCnt}
                            shareCnt={data.shareCnt}
                            viewCnt={data.viewCnt}
                            createdAt={data.createdAt}
                            thumbnailUrl={data.thumbnailUrl}
                            contents={data.contents}
                            uuid={data.uuid}
                        />
                    ))}
                </Grid>
            </Box>
        </PageWrapper >
    );
}

const PageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 56px);
    justify-content: center;
    align-items: center;
    overflow: auto;
`

export default TrendingPage;
