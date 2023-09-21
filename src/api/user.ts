import { useLogout } from "@/hooks/useAccount";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { DELETE_USER_URL } from "@/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Sentry from '@sentry/react';

const fetchDeleteUser = async (token: string) => {
    const response = await fetch(DELETE_USER_URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    })
    .then(async (response) => {
        const body = await response.json();
        if (response.ok) {
            return body;
        } else {
            throw new Error(body.resultCode);
        }
    })

    return response;
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const logout = useLogout();
    return useMutation(fetchDeleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            logout();
            useDefaultSnackbar('회원 탈퇴에 성공했습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('회원 탈퇴에 실패했습니다', 'error');
        },
        useErrorBoundary: false,
    });
}
