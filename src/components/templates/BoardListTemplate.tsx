import styled from 'styled-components';

import { Box, Grid } from '@mui/material';
import BoardListHeader from '@/components/molcules/BoardListHeader';
import theme from '@/assets/styles/theme';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useGetBoardList } from '@/api/board';

export interface IBoardListInfo {
    boardId: number;
    boardName: string;
    description: string;
    isFixed?: string,
    tag: string,
    modifiedDate: string,
}

function BoardListTemplate() {
    const navigate = useNavigate();

    const { data, isLoading } = useInfiniteQuery(
        ['boards'],
        ({ pageParam = 0 }) => {
            return useGetBoardList({ pages: pageParam, size: 30 })
        },
        {
            getNextPageParam: (lastPage) => {
                const nextPage = !lastPage.data.last ? lastPage.data.pageable.pageNumber + 1 : undefined;
                return nextPage;
            },
        }
    );

    if (isLoading) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                로딩중
            </Box>
        )
    }

    return (
        <>
            <ScrapListContainer>
                <BoardListHeader count={1} />
                <Box
                    sx={{
                        height: 'calc(100% - 145px)',
                    }}
                >
                    <Grid container
                        columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                        sx={{
                            gap: '16px',
                            padding: '24px',
                        }}
                    >
                        {data?.pages.map((page) => {
                            return page.data.content.map((board: IBoardListInfo) => {
                                return (
                                    <Box
                                        sx={{
                                            width: '320px',
                                            height: '180px',
                                            backgroundColor: theme.color.Blue_090,
                                        }}
                                        onClick={() => navigate(`/board_info?boardId=${board.boardId}&title=${board.boardName}`)}
                                    >
                                        {board.boardName}
                                    </Box>
                                )
                            })
                        })}
                    </Grid>
                </Box>
            </ScrapListContainer>
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 209px);
    height: calc(100% - 56px);
    position: fixed;
    right: 0;
    top: 56px;
    @media screen and (max-width: 600px) {
      width: 100vw;
      left: 0;
    }
    display: flex;
    flex-direction: column;
    overflow: auto;
`

export default BoardListTemplate;
