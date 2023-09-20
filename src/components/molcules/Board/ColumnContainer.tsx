import { Column } from "@/components/templates/BoardTemplate";
import { Box } from "@mui/material";

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
        {column.title}
    </Box>
}

export default ColumnContainer;
