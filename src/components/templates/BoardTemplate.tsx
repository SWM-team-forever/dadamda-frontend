import ColumnContainer from "@/components/molcules/Board/ColumnContainer";
import { Box, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { AnimateLayoutChanges, SortableContext, arrayMove, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { create } from "@mui/material/styles/createTransitions";
import TaskCard from "@/components/molcules/Board/TaskCard";
import { act } from "react-dom/test-utils";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { Column, ScrapOrMemo } from "@/types/IBoardAtom";

function BoardTemplate() {
    const { board, createNewColumn, onDragEnd, onDragOver, onDragStart, activeTask, activeColumn } = useBoardAtom();
    const [columns, setColumns] = useState<Column[]>(board.columnList);
    const columnsId = useMemo(() => columns.map((column) => column.columnId), [columns]);
    const [tasks, setTasks] = useState<ScrapOrMemo[]>(board.ScrapOrMemoList);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        }),
        useSensor(MouseSensor),
        useSensor(TouchSensor),
    );
    const animateLayoutChanges: AnimateLayoutChanges = (args) =>
        defaultAnimateLayoutChanges({ ...args, wasDragging: true });

    return (
        <Box>
            <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                sensors={sensors}
                collisionDetection={closestCenter}
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
                        {board.columnList.map((column) =>
                            <ColumnContainer
                                column={column}
                                deleteColumn={deleteColumn}
                                deleteTask={deleteTask}
                                key={column.columnId}
                                tasks={board.ScrapOrMemoList.filter((task) => task.columnId === column.columnId)}
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
                        {/* {activeColumn
                            && <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                deleteTask={deleteTask}
                                tasks={board.ScrapOrMemoList.filter(
                                    (task) => task.columnId === activeColumn.columnId
                                )}
                            />
                        } */}
                        {activeTask
                            && <TaskCard
                                task={activeTask}
                                deleteTask={deleteTask}
                            />
                        }
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

        </Box>
    );

    function deleteColumn(id: string) {
        const newColumns = columns.filter((column) => column.columnId !== id);
        setColumns(newColumns);

        const newTasks = tasks.filter((task) => task.columnId !== id);
        setTasks(newTasks);
    }

    function deleteTask(id: string) {
        const newTask = tasks.filter(task => task.taskId !== id);
        setTasks(newTask);
    }
}

export default BoardTemplate;
