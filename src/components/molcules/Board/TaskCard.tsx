import TextArea from "@/components/atoms/TextArea";
import { Task, id } from "@/components/templates/BoardTemplate";
import { useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/assets/styles/theme";

interface Props {
    task: Task;
    deleteTask: (id: id) => void;
    updateTask: (id: id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
    }

    if (isDragging) {
        return <Box
            ref={setNodeRef}
            style={style}
            sx={{
                cursor: 'grab',
                width: '100%',
                height: '50px',
                backgroundColor: theme.color.Gray_080,
                mb: '10px',
                opacity: 0.5,
            }}
        />
    }

    if (editMode) {
        return (
            <Box
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                sx={{
                    cursor: 'grab',
                    width: '100%',
                    height: '50px',
                    backgroundColor: theme.color.Gray_080,
                    mb: '10px',
                }}
                onClick={toggleEditMode}
            >
                <textarea
                    value={task.content}
                    autoFocus
                    placeholder="task content"
                    onBlur={toggleEditMode}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            toggleEditMode();
                        }
                    }}
                    onChange={(e) => {
                        updateTask(task.id, e.target.value);
                    }}
                />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                cursor: 'grab',
                width: '100%',
                height: '50px',
                backgroundColor: theme.color.Gray_080,
                mb: '10px',
            }}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={toggleEditMode}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            {task.content}
            {mouseIsOver
                && <Button
                    onClick={() => {
                        deleteTask(task.id)
                    }}
                    sx={{
                        opacity: 0.5,
                        '&:hover': {
                            opacity: 1,
                        }
                    }}
                >
                    - Delete
                </Button>}
        </Box>
    );
}

export default TaskCard;
