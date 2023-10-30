import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DELETE_MEMO_URL, POST_CREATE_MEMO_URL } from "../secret";
import { useDefaultSnackbar } from "../hooks/useWarningSnackbar";
import * as Sentry from '@sentry/react';
import { useGetToken } from "@/hooks/useAccount";

export interface fetchPostCreateMemoProps {
    scrapId: number,
    textAreaValue: string,
}

const fetchPostCreateMemo = async({scrapId, textAreaValue}: fetchPostCreateMemoProps) => {
    const token = useGetToken();

    const response = await fetch(POST_CREATE_MEMO_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            scrapId: scrapId,
            memoText: textAreaValue,
        }),
    })
    
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        throw new Error(body.resultCode);
    }
}

export const usePostCreateMemo = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchPostCreateMemo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['scraps']);
            useDefaultSnackbar('메모가 생성되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('메모 생성에 실패하였습니다.', 'error');
        },
        useErrorBoundary: true,
        retry: false,
    });
}

export interface fetchDeleteMemoProps {
    scrapId: number,
    memoId: number,
}

const fetchDeleteMemo = async({memoId, scrapId}: fetchDeleteMemoProps) => {
    const token = useGetToken();
    
    const response = await fetch(DELETE_MEMO_URL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            scrapId: scrapId,
            memoId: memoId,
        }),
    })
    
    const body = await response.json();
    if (response.ok) {
        return body;
    } else {
        throw new Error(body.resultCode);
    }
};

export const useDeleteMemo = () => {
    const queryClient = useQueryClient();
    return useMutation(fetchDeleteMemo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['scraps']);
            useDefaultSnackbar('메모가 삭제되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('메모 삭제에 실패하였습니다.', 'error');
        },
        useErrorBoundary: true,
        retry: false,
    });
}
