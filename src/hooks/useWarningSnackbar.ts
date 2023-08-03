import { enqueueSnackbar } from "notistack";

function useWarningSnackbar() {
    enqueueSnackbar('아직 구현되지 않은 기능입니다!', {autoHideDuration: 1000, variant: 'warning'});
}

export default useWarningSnackbar;