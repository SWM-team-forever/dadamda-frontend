import ColumnContainer from "@/components/molcules/Board/ColumnContainer";
import { Box, Button } from "@mui/material";
import { useState } from "react";

export type id = string | number;
export type Column = {
    id: id;
    title: string;
}

function BoardTemplate({ boardId }: { boardId: string | null }) {
    const [columns, setColumns] = useState<Column[]>([]);

    return (
        <div>
            보드 {boardId} 보드 페이지
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    {columns.map((column) =>
                        <ColumnContainer
                            column={column}
                            deleteColumn={deleteColumn}
                            key={column.id}
                        />
                    )}
                </Box>
                <Button
                    onClick={createNewColumn}
                >
                    + Add Column
                </Button>
            </Box>
        </div>
    );

    function createNewColumn() {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    }

    function deleteColumn(id: id) {
        const newColumns = columns.filter((column) => column.id !== id);
        setColumns(newColumns);
    }
}

function generateId() {
    return Math.floor(Math.random() * 10001);
}

export default BoardTemplate;
