import { Typography } from "@mui/material"
import theme from "../../../assets/styles/theme"

function MemoCreateButton({ showMemoCreateModal }: { showMemoCreateModal: () => void }) {
    return (
        <Typography variant="h6" color={theme.color.Blue_dry} component="div" onClick={showMemoCreateModal}>
            {'+ 메모 추가'}
        </Typography>
    )
}

export default MemoCreateButton
