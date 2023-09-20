import ColumnContainer from "@/components/molcules/Board/ColumnContainer";
import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

export type id = string | number;
export type Column = {
    id: id;
    title: string;
}

function BoardTemplate({ boardId }: { boardId: string | null }) {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    return (
        <div>
            보드 {boardId} 보드 페이지
            <Box>
                <DndContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <SortableContext
                            items={columnsId}
                        >
                            {columns.map((column) =>
                                <ColumnContainer
                                    column={column}
                                    deleteColumn={deleteColumn}
                                    key={column.id}
                                />
                            )}
                        </SortableContext>
                    </Box>
                    <Button
                        onClick={createNewColumn}
                    >
                        + Add Column
                    </Button>
                    {createPortal(
                        <DragOverlay>
                            {activeColumn
                                && <ColumnContainer
                                    column={activeColumn}
                                    deleteColumn={deleteColumn}
                                />
                            }
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>

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

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'column') {
            const column = event.active.data.current?.column;
            setActiveColumn(column);
            return;
        }
    }

    function onDragEnd(Event: DragEndEvent) {
        const { active, over } = Event;
        if (!over) {
            return;
        }

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) {
            return;
        }

        setColumns((columns) => {
            const overColumnIndex = columns.findIndex((column) => column.id === overColumnId);
            const activeColumnIndex = columns.findIndex((column) => column.id === activeColumnId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
    }
}

function generateId() {
    return Math.floor(Math.random() * 10001);
}

export default BoardTemplate;
