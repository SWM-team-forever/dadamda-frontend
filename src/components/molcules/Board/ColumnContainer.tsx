import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/assets/styles/theme";
import { DragOverlay } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import TaskCard from "@/components/molcules/Board/TaskCard";
import { Column, ScrapOrMemo } from "@/types/IBoardAtom";

interface Props {
    column: Column;
    deleteColumn: (id: string) => void;

    deleteTask: (id: string) => void;
    tasks: ScrapOrMemo[];
}

function ColumnContainer(props: Props) {
    const {
        column,
        deleteColumn,
        tasks,
        deleteTask,
    } = props;
    const tasksIds = useMemo(() => tasks.map((task) => task.taskId), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.columnId,
        data: {
            type: 'Column',
            column,
        },
    });

    return <Box
        sx={{
            width: "350px",
            minHeight: "50px",
            backgroundColor: theme.color.Blue_050,
        }}
    >
        {/* <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'grab',
            }}
            {...attributes}
            {...listeners}
        >
        </Box> */}
        <Box
            {...attributes}
            {...listeners}
        >
            <SortableContext items={tasksIds}>
                {tasks.map((task) => {
                    return <TaskCard
                        key={task.taskId}
                        task={task}
                        deleteTask={deleteTask}
                    />
                })}
            </SortableContext>
        </Box>
    </Box>
}

export default ColumnContainer;
