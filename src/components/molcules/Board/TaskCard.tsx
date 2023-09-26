import TextArea from "@/components/atoms/TextArea";
import { useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/assets/styles/theme";
import ScrapCard from "@/components/molcules/Board/ScrapCard";
import { ScrapOrMemo, Scrap } from "@/types/IBoardAtom";

interface Props {
    task: ScrapOrMemo;
    deleteTask: (id: string) => void;
}

function TaskCard({ task, deleteTask }: Props) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.taskId,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return <Box
            sx={{
                cursor: 'grab',
                width: '100%',
                mb: '10px',
                opacity: 0.5,
            }}
            ref={setNodeRef}
            style={style}
        >
            <ScrapCard content={task} />
        </Box>
    }

    return (
        <Box
            sx={{
                cursor: 'grab',
                width: '100%',
                mb: '10px',
            }}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <ScrapCard content={task} />

            {/* {mouseIsOver
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
                </Button>} */}
        </Box>
    );
}

export default TaskCard;
