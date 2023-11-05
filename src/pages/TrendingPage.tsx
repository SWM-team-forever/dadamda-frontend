import TrendingCard, { TrendingCardProps } from '@/components/molcules/Trending/TrendingCard';
import { Box } from '@mui/material';
import { trendingMockData } from '__mocks__/trendingMockData';
import styled from 'styled-components';

function TrendingPage() {
    return (
        <PageWrapper>
            <Box
                sx={{
                    width: {
                        xs: '100%',
                        sm: '650px',
                    },
                    height: '100%',
                    gap: '24px',
                    p: {
                        xs: '12px 24px',
                        sm: '12px 0',
                    },
                    boxSizing: 'border-box',
                }}
            >
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
                    />
                ))}
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
