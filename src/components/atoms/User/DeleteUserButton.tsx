import { Button } from "@mui/material";

import { useModal } from "@/hooks/useModal";

import { grayOutlinedButtonStyle } from "@/pages/UserPage";

function DeleteUserButton() {
    const { openModal } = useModal();
    const handleDeleteUser = () => {
        openModal('userDelete');
    }

    return (
        <Button
            onClick={handleDeleteUser}
            sx={grayOutlinedButtonStyle}
        >
            탈퇴하기
        </Button>
    );
}

export default DeleteUserButton;
