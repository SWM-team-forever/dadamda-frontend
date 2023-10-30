import styled from 'styled-components';
import { Box, CircularProgress } from '@mui/material';

import { useGetScrapCount } from '@/api/count';

import ScrapListHeader from '@/components/molcules/ScrapListHeader';
import MatchTemplateWithTypeAndCount from '@/components/templates/MatchTemplateWithTypeAndCount';

interface ScrapTemplateProps {
    type: string,
}

function ScrapTemplate({ type }: ScrapTemplateProps) {
    const { count, isCountLoading, isCountFetched } = useGetScrapCount(type);

    if (isCountLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    return (
        <>
            <ScrapListContainer>
                {isCountFetched && <ScrapListHeader type={type} count={count} />}
                <Box
                    sx={{
                        height: 'calc(100% - 125px)',
                    }}
                >
                    {isCountFetched && <MatchTemplateWithTypeAndCount type={type} count={count} />}
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
    padding: 24px 24px 0 24px;
    box-sizing: border-box;
`

export default ScrapTemplate;
