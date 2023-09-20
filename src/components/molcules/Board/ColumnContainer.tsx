import { Column, id } from "@/components/templates/BoardTemplate";
import { useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/assets/styles/theme";
import { DragOverlay } from "@dnd-kit/core";
import { useState } from "react";

interface Props {
    column: Column;
    deleteColumn: (id: id) => void;
    updateColumn: (id: id, title: string) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, updateColumn } = props;
    const [editMode, setEditMode] = useState(false);

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
    </Box>
}

export default ColumnContainer;
