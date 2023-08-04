import { enqueueSnackbar } from "notistack";

function useWarningSnackbar() {
    enqueueSnackbar('아직 구현되지 않은 기능입니다!', {autoHideDuration: 1000, variant: 'warning'});
}

export function useDefaultSnackbar(message: string, variant: 'warning' | 'default' | 'success' | 'error' | 'info') {
    enqueueSnackbar(message, {autoHideDuration: 1000, variant: variant})
}

export default useWarningSnackbar;