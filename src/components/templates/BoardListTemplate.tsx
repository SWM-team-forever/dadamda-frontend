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
    modifiedDate: number,
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
                        sx={{
                            width: '100%',
                            height: '100%',
                            p: '10px 24px',
                        }}
                        columns={13}
                        rowGap={{
                            xs: 1,
                            sm: 4,
                            md: 3.5,
                            lg: 3.5,
                            xl: 3.5,
                        }}
                        columnGap={{
                            xs: 1,
                            sm: 4,
                            md: 3.5,
                            lg: 3.5,
                            xl: 3.5,
                        }}
                    >
                        {data?.pages.map((page) => {
                            return page.data.content.map((board: IBoardListInfo) => {
                                return (
                                    <Grid item
                                        xs={13} sm={6} md={4} lg={3} xl={3}
                                        key={board.boardId}
                                        sx={{

                                        }}
                                        onClick={() => navigate(`/board_info?boardId=${board.boardId}&title=${board.boardName}`)}
                                    >
                                        <Box
                                            sx={{
                                                height: '180px',
                                                width: '100%',
                                                backgroundColor: theme.color.Blue_090,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: theme.color.Blue_080,
                                                },
                                            }}
                                        >
                                            {board.boardName}
                                        </Box>
                                    </Grid>
                                )
                            })
                        })}
                    </Grid>
                </Box>
            </ScrapListContainer >
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
