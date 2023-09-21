import { Task } from "@/components/templates/BoardTemplate";
import { Box, Button } from "@mui/material";

interface Props {
    task: Task;
}

function TaskCard({ task }: Props) {
    return (
        <Box
            sx={{
                cursor: 'grab',
            }}
        >
            {task.content}
            <Button>- Delete</Button>
        </Box>
    );
}

export default TaskCard;
