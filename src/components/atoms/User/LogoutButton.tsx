import { Button } from "@mui/material";

import { useLogout } from "@/hooks/useAccount";

import { grayFullfilledButtonStyle } from "@/pages/UserPage";

function LogoutButton() {
    const handleLogout = useLogout();

    return (
        <Button
            onClick={handleLogout}
            sx={grayFullfilledButtonStyle}
        >
            로그아웃
        </Button>
    );
}

export default LogoutButton;
