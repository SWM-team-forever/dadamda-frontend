import styled from 'styled-components';

import { Box } from '@mui/material';
import BoardListHeader from '@/components/molcules/BoardListHeader';
import theme from '@/assets/styles/theme';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BoardTemplate from '@/components/templates/BoardTemplate';

function BoardListTemplate() {
    const navigate = useNavigate();

    return (
        <>
            <ScrapListContainer>
                <BoardListHeader count={1} />
                <Box
                    sx={{
                        height: 'calc(100% - 145px)',
                    }}
                >
                    <Box
                        sx={{
                            width: '320px',
                            height: '180px',
                            backgroundColor: theme.color.Blue_090,
                        }}
                        onClick={() => navigate(`/board_info?boardId=${1}`)}
                    >
                        보드 1
                    </Box>
                </Box>
            </ScrapListContainer>
        </>
    );
}

const ScrapListContainer = styled.div`
    width: calc(100% - 209px);
    height: calc(100% - 56px);
    background-color: linear-gradient(114deg, #EBEEF3 12.12%, #D6DEEA 100%);
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
