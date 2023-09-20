import { Column } from "@/components/templates/BoardTemplate";
import { Box, Button } from "@mui/material";

interface Props {
    column: Column;
}

function ColumnContainer(props: Props) {
    const { column } = props;
    return <Box
        sx={{
            width: "350px",
            height: "500px",
        }}
    >
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                0
                {column.title}
            </Box>
            <Button>
                X
            </Button>
        </Box>
    </Box>
}

export default ColumnContainer;
