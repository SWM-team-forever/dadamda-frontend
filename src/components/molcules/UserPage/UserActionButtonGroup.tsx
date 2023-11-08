import { Box } from "@mui/material";

import DeleteUserButton from "@/components/atoms/User/DeleteUserButton";
import LogoutButton from "@/components/atoms/User/LogoutButton";
import { useIsUserPageViewMode } from "@/pages/UserPage";

function UserActionButtonGroup({ mode }: { mode: string }) {
    return (
        useIsUserPageViewMode(mode)
        && <Box
            sx={{
                display: 'flex',
                gap: '8px',
                mt: '20px',
                width: '100%',
                justifyContent: 'flex-end',
            }}
        >
            <LogoutButton />
            <DeleteUserButton />
        </Box>
    );
}

export default UserActionButtonGroup;
