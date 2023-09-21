import { Task } from "@/components/templates/BoardTemplate";
import { Box } from "@mui/material";

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
        </Box>
    );
}

export default TaskCard;
