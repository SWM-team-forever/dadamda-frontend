import BoardTemplate from "@/components/templates/BoardTemplate";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function BoardInfoPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    function getBoardPageId() {
        return searchParams.get('boardId');
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100% - 56px)',
            }}
        >
            <Typography>보드 {getBoardPageId()}</Typography>
            <BoardTemplate />
        </Box>
    );
}

export default BoardInfoPage;
