import { Column, id } from "@/components/templates/BoardTemplate";
import { useSortable } from "@dnd-kit/sortable";
import { Box, Button } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import theme from "@/assets/styles/theme";
import { DragOverlay } from "@dnd-kit/core";

interface Props {
    column: Column;
    deleteColumn: (id: id) => void;
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn } = props;

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
        }
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
        >
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                0
                {column.title}
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
