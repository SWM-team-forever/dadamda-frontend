import { Typography } from "@mui/material";

export function SiteNameElement({ siteName }) {
    return (
        <Typography
            sx={{
                wordBreak: 'break-all',
            }}>
            {siteName}
        </Typography>
    )
}
