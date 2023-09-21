import TextArea from "@/components/atoms/TextArea";
import { Task, id } from "@/components/templates/BoardTemplate";
import { Box, Button } from "@mui/material";
import { useState } from "react";

interface Props {
    task: Task;
    deleteTask: (id: id) => void;
    updateTask: (id: id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const toggleEditMode = () => {
        setEditMode(prev => !prev);
        setMouseIsOver(false);
    }

    if (editMode) {
        return (
            <Box
                sx={{
                    cursor: 'grab',
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
            }}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={toggleEditMode}
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
