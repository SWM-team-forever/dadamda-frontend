import { Column, Task, id } from "@/components/templates/BoardTemplate";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/assets/styles/theme";
import { DragOverlay } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import TaskCard from "@/components/molcules/Board/TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: id) => void;
    updateColumn: (id: id, title: string) => void;

    createTask: (columnId: id) => void;
    deleteTask: (id: id) => void;
    updateTask: (id: id, content: string) => void;
    tasks: Task[];
}

function ColumnContainer(props: Props) {
    const {
        column,
        deleteColumn,
        updateColumn,
        createTask,
        tasks,
        deleteTask,
        updateTask,
    } = props;
    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        data: {
            type: 'column',
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return <Box
            sx={{
                width: "350px",
                height: "500px",
                backgroundColor: theme.color.Blue_050,
                opacity: 0.5,
                border: '1px solid black',
            }}
            style={style}
            ref={setNodeRef}
        ></Box>
    }

    return <Box
        sx={{
            width: "350px",
            height: "500px",
            backgroundColor: theme.color.Blue_050,
        }}
        style={style}
        ref={setNodeRef}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '60px',
                cursor: 'grab',
            }}
            {...attributes}
            {...listeners}
            onClick={() => setEditMode(true)}
        >
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                0
                {editMode &&
                    <input
                        autoFocus
                        value={column.title}
                        onChange={(e) => {
                            updateColumn(column.id, e.target.value)
                        }}
                        onBlur={() => setEditMode(false)}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter') {
                                return
                            }
                            setEditMode(false);
                        }}
                    />
                }
                {!editMode && column.title}
            </Box>
            <Button
                onClick={() => deleteColumn(column.id)}
            >
                X
            </Button>
        </Box>
        <Box>
            <SortableContext items={tasksIds}>
                {tasks.map((task) => {
                    return <TaskCard
                        key={task.id}
                        task={task}
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                    />
                })}
            </SortableContext>
        </Box>
        <Button
            onClick={() => {
                createTask(column.id);
            }}
        >
            + Add Task
        </Button>
    </Box>
}

export default ColumnContainer;
