import { Box, Button } from "@mui/material";
import { useState } from "react";

function BoardTemplate({ boardId }: { boardId: string | null }) {
    const [columns, setColumns] = useState([]);

    return (
        <div>
            보드 {boardId} 보드 페이지
            <Box>
                <Button
                    onClick={createNewColumn}
                >
                    + Add Column
                </Button>
            </Box>
        </div>
    );

    function createNewColumn() {

    }
}

export default BoardTemplate;
