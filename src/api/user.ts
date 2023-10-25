import { useGetToken, useLogout } from "@/hooks/useAccount";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { DELETE_USER_URL, GET_USER_INFORMATION_URL } from "@/secret";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const getUserInformation = async () => {
    const token = useGetToken();

    const response = await fetch(GET_USER_INFORMATION_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
    }).then((response) => {
            return response.json().then(body => {
                if (response.ok) {
                    return body;
                } else {
                    throw new Error(body.resultCode);
                }
            })
        });

    return response;
}

export const useGetUserInformation = () => {
    const { data, isLoading } = useQuery(
        ['userInformation'], 
        () => getUserInformation(), 
        {
            retry: false,
            select: (data) => {
                return data.data;
            },
            onError: (error) => {
                Sentry.captureException(error);
            },
            useErrorBoundary: true,
        }
    );

    const [userInformation, isGetUserInformationLoading] = [data, isLoading];
    return { userInformation, isGetUserInformationLoading};
};
        
