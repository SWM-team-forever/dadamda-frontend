import { Task } from "@/components/templates/BoardTemplate";
import { Box, Button } from "@mui/material";
import { useState } from "react";

interface Props {
    task: Task;
}

function TaskCard({ task }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    return (
        <Box
            sx={{
                cursor: 'grab',
            }}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            {task.content}
            {mouseIsOver && <Button>- Delete</Button>}
        </Box>
    );
}

export default TaskCard;
