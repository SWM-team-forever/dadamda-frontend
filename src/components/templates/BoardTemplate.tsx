import ColumnContainer from "@/components/molcules/Board/ColumnContainer";
import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { create } from "@mui/material/styles/createTransitions";

export type id = string | number;
export type Column = {
    id: id;
    title: string;
}
export type Task = {
    id: id;
    columnId: id;
    content: string;
}

function BoardTemplate({ boardId }: { boardId: string | null }) {
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    return (
        <div>
            보드 {boardId} 보드 페이지
            <Box>
                <DndContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    sensors={sensors}
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
                                    updateColumn={updateColumn}
                                    deleteTask={deleteTask}
                                    key={column.id}
                                    createTask={createTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter((task) => task.columnId === column.id)}
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
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    tasks={tasks.filter(
                                        (task) => task.columnId === activeColumn.id
                                    )}
                                    updateTask={updateTask}
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

    function updateColumn(id: id, title: string) {
        const newColumns = columns.map((column) => {
            if (column.id !== id) {
                return column;
            }

            return {
                ...column,
                title,
            };
        });

        setColumns(newColumns);
    }

    function createTask(columnId: id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
    }

    function deleteTask(id: id) {
        const newTask = tasks.filter(task => task.id !== id);
        setTasks(newTask);
    }

    function updateTask(id: id, content: string) {
        const newTasks = tasks.map((task) => {
            if (task.id !== id) {
                return task;
            }

            return {
                ...task,
                content,
            };
        });

        setTasks(newTasks);
    }

}

function generateId() {
    return Math.floor(Math.random() * 10001);
}

export default BoardTemplate;
