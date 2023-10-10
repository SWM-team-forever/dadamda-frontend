import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { DELETE_BOARD_URL, EDIT_BOARD_URL, GET_BOARD_LIST_URL, GET_BOARD_URL, POST_CREATE_BOARD_URL } from "@/secret";
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

const getBoard = async (boardId: string) => {
    const response = token && await fetch(`${GET_BOARD_URL}/${boardId}`, {
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

export const useGetBoard = async (boardId: string) => {
    const board = await getBoard(boardId);
    return board;
}

const deleteBoard = async (boardId: string) => {
    const response = token && await fetch(`${DELETE_BOARD_URL}/${boardId}`, {
        method: "DELETE",
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

export const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
            useDefaultSnackbar('보드가 삭제되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 삭제에 실패하였습니다.', 'error');
        },
        useErrorBoundary: false,
    });
}

interface editBoardProps {
    boardId: string,
    name: string,
    description: string,
    tag: string,
}

const editBoard = async ({boardId, description, tag, name}: editBoardProps) => {
    const response = token && await fetch(`${EDIT_BOARD_URL}/${boardId}`, {
        method: "PATCH",
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

export const useEditBoard = () => {
    const queryClient = useQueryClient();

    return useMutation(editBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries(['boards']);
            useDefaultSnackbar('보드가 수정되었습니다', 'success');
        },
        onError: (error) => {
            Sentry.captureException(error);
            useDefaultSnackbar('보드 수정에 실패하였습니다.', 'error');
        },
        useErrorBoundary: false,
    });
}
