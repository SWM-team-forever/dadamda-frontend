import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { GET_BOARD_LIST_URL, POST_CREATE_BOARD_URL } from "@/secret";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Sentry from '@sentry/react';

interface fetchDatasProps {
    url?: string;
    pages: number;
    size: number;
}

const token = localStorage.getItem("token");

const fetchDatas = async ({ url, pages, size }: fetchDatasProps) => {
    const response = token && await fetch(url + `?page=${pages}&size=${size}`, {
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
};

export const useGetBoardList = async ({ pages, size }: fetchDatasProps) => {
    const boards = await fetchDatas({ url: GET_BOARD_LIST_URL, pages: pages, size: size });
    return boards;
}

interface fetchPostCreateBoardProps {
    name: string,
    description: string,
    tag: string,
}

const fetchPostCreateBoard = async({name, description, tag}: fetchPostCreateBoardProps) => {
    const response = token && await fetch(POST_CREATE_BOARD_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-AUTH-TOKEN": token,
        },
        body: JSON.stringify({
            name: name,
            description: description,
            tag: tag,
        }),
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

export const usePostCreateBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(fetchPostCreateBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
            useDefaultSnackbar('보드가 생성되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 생성에 실패하였습니다.', 'error');
        },
        useErrorBoundary: false,
    });
}
