import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import {
	COPY_OPEN_BOARD_URL,
	DELETE_BOARD_URL,
	EDIT_BOARD_URL,
	GET_BOARD_IS_PUBLIC_URL,
	GET_BOARD_IS_SHARED_URL,
	GET_BOARD_LIST_URL,
	GET_BOARD_URL,
	GET_OPEN_BOARD_CONTENTS_URL,
	GET_OPEN_BOARD_TITLE_URL,
	GET_SHORTENED_SHARING_BOARD_URL,
	POST_CREATE_BOARD_URL,
	SEARCH_BOARD_LIST_URL,
	TOGGLE_BOARD_IS_PUBLIC_URL,
} from "@/secret";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Sentry from "@sentry/react";
import { useNavigate } from "react-router-dom";
import { useGetToken } from "@/hooks/useAccount";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { logEvent } from "@amplitude/analytics-browser";
import { useModal } from "@/hooks/useModal";

interface fetchDatasProps {
	url?: string;
	pages: number;
	size: number;
}

const getBoardList = async ({ url, pages, size }: fetchDatasProps) => {
	const token = useGetToken();

	const response = await fetch(url + `?page=${pages}&size=${size}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetBoardList = ({ pages, size }: fetchDatasProps) => {
	const boards = getBoardList({
		url: GET_BOARD_LIST_URL,
		pages: pages,
		size: size,
	});
	return boards;
};

interface fetchPostCreateBoardProps {
	title: string;
	description: string;
	tag: string;
}

const fetchPostCreateBoard = async ({
	title,
	description,
	tag,
}: fetchPostCreateBoardProps) => {
	const token = useGetToken();

	const response = await fetch(POST_CREATE_BOARD_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
		body: JSON.stringify({
			title: title,
			description: description,
			tag: tag,
		}),
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const usePostCreateBoard = () => {
	const queryClient = useQueryClient();

	return useMutation(fetchPostCreateBoard, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boards"]);
			queryClient.invalidateQueries(["boardListCount"]);
			useDefaultSnackbar("보드가 생성되었습니다", "success");
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 생성에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});
};

const getBoard = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(`${GET_BOARD_URL}/${boardUUID}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetBoard = (boardUUID: string) => {
	const board = getBoard(boardUUID);
	return board;
};

const deleteBoard = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(`${DELETE_BOARD_URL}/${boardUUID}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useDeleteBoard = () => {
	const queryClient = useQueryClient();

	return useMutation(deleteBoard, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boards"]);
			queryClient.invalidateQueries(["boardListCount"]);
			queryClient.invalidateQueries(["board"]);
			useDefaultSnackbar("보드가 삭제되었습니다", "success");
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 삭제에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});
};

interface editBoardProps {
	boardUUID: string;
	title: string;
	description: string;
	tag: string;
}

const editBoard = async ({
	boardUUID,
	description,
	tag,
	title,
}: editBoardProps) => {
	const token = useGetToken();

	const response = await fetch(`${EDIT_BOARD_URL}/${boardUUID}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
		body: JSON.stringify({
			title: title,
			description: description,
			tag: tag,
		}),
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useEditBoard = () => {
	const queryClient = useQueryClient();

	return useMutation(editBoard, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boards"]);
			queryClient.invalidateQueries(["board"]);
			useDefaultSnackbar("보드가 수정되었습니다", "success");
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 수정에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});
};

interface saveBoardProps {
	boardUUID: string;
	contents: any;
}

const saveBoard = async ({ boardUUID, contents }: saveBoardProps) => {
	const token = useGetToken();

	const response = await fetch(
		`${EDIT_BOARD_URL}/${boardUUID}/contents`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
			body: JSON.stringify({
				contents: JSON.stringify(contents),
			}),
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useSaveBoard = () => {
	const queryClient = useQueryClient();

	return useMutation(saveBoard, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boardContent"]);
			useDefaultSnackbar("보드가 저장되었습니다", "success");
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 저장에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});
};

export const useAutoSaveBoard = () => {
	const { mutate } = useMutation(saveBoard, {
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 저장에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});

	const autoSaveBoardMutate = mutate;

	return { autoSaveBoardMutate };
};

const getBoardContents = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(
		`${EDIT_BOARD_URL}/${boardUUID}/contents`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetBoardContents = (boardUUID: string) => {
	const boardContents = getBoardContents(boardUUID);
	return boardContents;
};

interface searchKeywordInBoardListProps {
	keyword?: string | null;
	size: number;
	pages: number;
}

const searchKeywordInBoardList = async ({
	keyword,
	size,
	pages,
}: searchKeywordInBoardListProps) => {
	const token = useGetToken();

	const response = await fetch(
		`${SEARCH_BOARD_LIST_URL}?page=${pages}&size=${size}&keyword=${keyword}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useSearchKeywordInBoardList = ({
	keyword,
	size,
	pages,
}: searchKeywordInBoardListProps) => {
	const boardList = searchKeywordInBoardList({ keyword, size, pages });
	return boardList;
};

const fixBoardList = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(`${GET_BOARD_URL}/${boardUUID}/fix`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useFixBoardList = () => {
	const queryClient = useQueryClient();

	return useMutation(fixBoardList, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boards"]);
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar("다시 시도해주세요.", "error");
		},
		useErrorBoundary: true,
		retry: false,
	});
};

const getBoardIsShared = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(
		`${GET_BOARD_IS_SHARED_URL}/${boardUUID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetBoardIsShared = (boardUUID: string | null) => {
	const navigate = useNavigate();

	const { data, isLoading } = useQuery(
		["boardIsShared"],
		() => boardUUID && getBoardIsShared(boardUUID),
		{
			select: (data) => {
				return data?.data.isShared;
			},
			onError: (error) => {
				if (error.message === "NF005") {
					useDefaultSnackbar(
						"존재하지 않거나 권한이 없는 보드입니다.",
						"error"
					);
					navigate("/not-found");
				}
			},
			retry: false,
			useErrorBoundary: (error: Error) =>
				error.message !== "NF005",
		}
	);

	const [isBoardShared, isLoadingGetIsBoardShared] = [data, isLoading];

	return { isBoardShared, isLoadingGetIsBoardShared };
};

const toggleBoardIsShared = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(
		`${GET_BOARD_IS_SHARED_URL}/${boardUUID}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useToggleBoardIsShared = () => {
	const queryClient = useQueryClient();

	return useMutation(toggleBoardIsShared, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boardIsShared"]);
			logEvent("is_board_shared_toggle_clicked");
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 공유 상태 변경에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});
};

const getOpenBoardContents = async (boardUUID: string) => {
	const response = await fetch(
		`${GET_OPEN_BOARD_CONTENTS_URL}/${boardUUID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetOpenBoardContents = (boardUUID: string) => {
	const openBoardContents = getOpenBoardContents(boardUUID);
	return openBoardContents;
};

const getOpenBoardTitle = async (boardUUID: string) => {
	const response = await fetch(
		`${GET_OPEN_BOARD_TITLE_URL}/${boardUUID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetOpenBoardTitle = (boardUUID: string | null) => {
	if (!boardUUID) {
		throw new Error("NOT_KNOWN_ERROR");
	}

	const navigate = useNavigate();
	const { setBoard } = useBoardAtom();

	const { data, isLoading } = useQuery(
		["boardTitle", boardUUID],
		() => getOpenBoardTitle(boardUUID),
		{
			enabled: !!boardUUID,
			onError: (error: Error) => {
				if (error.message === "NF005") {
					useDefaultSnackbar(
						"존재하지 않거나 권한이 없는 보드입니다.",
						"error"
					);
					navigate("/not-found");
				}
			},
			onSuccess: () => {
				setBoard((prev) => ({
					...prev,
					boardUUID: boardUUID,
				}));
			},
			select: (data) => {
				return data?.data.title;
			},
			retry: false,
			useErrorBoundary: (error: Error) =>
				error.message !== "NF005",
		}
	);

	const [title, isTitleLoading] = [data, isLoading];
	return { title, isTitleLoading };
};

const getShortenedSharingBoardUrl = async (nativeUrl: string) => {
	if (!nativeUrl) {
		throw new Error("NOT_KNOWN_ERROR");
	}

	const token = useGetToken();

	const response = await fetch(GET_SHORTENED_SHARING_BOARD_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			native_url: nativeUrl,
		}),
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetShortenedSharingBoardUrl = (nativeUrl: string) => {
	const { data, isLoading } = useQuery(
		["shortenedSharingBoardUrl"],
		() => getShortenedSharingBoardUrl(nativeUrl),
		{
			retry: false,
			select: (data) => {
				return `https://${data?.forward_url}/${data?.short_id}`;
			},
			useErrorBoundary: true,
		}
	);

	const [shortenedSharingBoardUrl, isLoadingGetShortenedSharingBoardUrl] =
		[data, isLoading];
	return {
		shortenedSharingBoardUrl,
		isLoadingGetShortenedSharingBoardUrl,
	};
};

const copyOpenBoard = (boardUUID: string | null) => {
	if (!boardUUID) {
		throw new Error("NOT_KNOWN_ERROR");
	}

	const token = useGetToken();

	const response = fetch(`${COPY_OPEN_BOARD_URL}/${boardUUID}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-AUTH-TOKEN": token,
		},
	}).then((response) => {
		if (response.ok) {
			return response.json().then((body) => {
				return body;
			});
		} else {
			throw new Error(response.statusText);
		}
	});

	return response;
};

export const useCopyOpenBoard = () => {
	const queryClient = useQueryClient();

	return useMutation(copyOpenBoard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(["boards"]);
			queryClient.invalidateQueries(["trendingList"]);
			useDefaultSnackbar("보드가 복사되었습니다.", "success");
			window.open(
				`board-contents/${data?.data?.uuid}`,
				"_blank"
			);
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 복사에 실패하였습니다.",
				"error"
			);
		},
		useErrorBoundary: true,
		retry: false,
	});
};

const getBoardIsPublic = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(
		`${GET_BOARD_IS_PUBLIC_URL}/${boardUUID}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetBoardIsPublic = (boardUUID: string | null) => {
	const navigate = useNavigate();
	const { data, isLoading } = useQuery(
		["boardIsPublic"],
		() => boardUUID && getBoardIsPublic(boardUUID),
		{
			select: (data) => {
				return data?.data.isPublic;
			},
			onError: (error) => {
				if (error.message === "NF005") {
					useDefaultSnackbar(
						"존재하지 않거나 권한이 없는 보드입니다.",
						"error"
					);
					navigate("/not-found");
				}
			},
			retry: false,
			useErrorBoundary: (error: Error) =>
				error.message !== "NF005",
		}
	);

	const [isBoardPublic, isLoadingGetIsBoardPublic] = [data, isLoading];
	return { isBoardPublic, isLoadingGetIsBoardPublic };
};

const toggleBoardIsPublic = async (boardUUID: string) => {
	const token = useGetToken();

	const response = await fetch(
		`${TOGGLE_BOARD_IS_PUBLIC_URL}/${boardUUID}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-AUTH-TOKEN": token,
			},
		}
	).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useToggleBoardIsPublic = () => {
	const queryClient = useQueryClient();
	const { closeModal } = useModal();

	return useMutation(toggleBoardIsPublic, {
		onSuccess: () => {
			queryClient.invalidateQueries(["boardIsPublic"]);
			logEvent("is_board_public_toggle_clicked");
			closeModal();
			useDefaultSnackbar(
				"보드 게시 상태가 변경되었습니다.",
				"success"
			);
		},
		onError: (error) => {
			Sentry.captureException(error);
			useDefaultSnackbar(
				"보드 게시 상태 변경에 실패하였습니다.",
				"error"
			);
		},
		retry: false,
	});
};
