import { Typography } from "@mui/material";

export function TitleElement({ title }) {
    return (
        <Typography
            sx={{
                fontSize: '1.25rem',
                lineHeight: '120%',
            }}>
            {title}
        </Typography>
    )
}