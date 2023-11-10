import { useAutoSaveBoard, useSaveBoard } from "@/api/board";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import boardContainersAtom from "@/state/boardContainersAtom";
import boardContentAtom from "@/state/boardContentAtom";
import { TMemo, contentProps } from "@/types/ContentType";
import { useAtom } from "jotai";
import { unstable_batchedUpdates } from "react-dom";

export const useBoardContentAtom = () => {
	const [boardContent, setBoardContent] = useAtom(boardContentAtom);
	const [containers, setContainers] = useAtom(boardContainersAtom);
	const { board } = useBoardAtom();

	const { mutate } = useSaveBoard();
	const { autoSaveBoardMutate } = useAutoSaveBoard();

	function pasteScrap(scrap: contentProps["content"]) {
		const firstColumn = Object.keys(boardContent)[0];
		const newBoard = firstColumn
			? {
					...boardContent,
					[firstColumn]: [
						{
							...scrap,
							id: `${
								scrap.scrapId +
								Math.random()
							}`,
						},
						...boardContent[firstColumn],
					],
			  }
			: {
					[getNextContainerId()]: [
						{
							...scrap,
							id: `${
								scrap.scrapId +
								Math.random()
							}`,
						},
					],
			  };

		setBoardContent(newBoard);
		setContainers(Object.keys(newBoard));
	}

	function pasteSticker(sticker: TMemo) {
		const firstColumn = Object.keys(boardContent)[0];
		const newBoard = firstColumn
			? {
					...boardContent,
					[firstColumn]: [
						{
							...sticker,
							id: `${
								sticker.memoId +
								Math.random()
							}`,
						},
						...boardContent[firstColumn],
					],
			  }
			: {
					[getNextContainerId()]: [
						{
							...sticker,
							id: `${
								sticker.memoId +
								Math.random()
							}`,
						},
					],
			  };

		setBoardContent(newBoard);
		setContainers(Object.keys(newBoard));
	}

	function handleAddColumn() {
		const newContainerId = getNextContainerId();

		unstable_batchedUpdates(() => {
			setContainers((containers) => [
				...containers,
				newContainerId,
			]);
			setBoardContent((items) => ({
				...items,
				[newContainerId]: [],
			}));
		});
	}

	function getNextContainerId() {
		const containerIds = Object.keys(boardContent);
		const sortedContainerIds = containerIds.sort(
			(a, b) => b.charCodeAt(0) - a.charCodeAt(0)
		);
		const lastContainerId = sortedContainerIds[0];

		return lastContainerId
			? String.fromCharCode(lastContainerId.charCodeAt(0) + 1)
			: "A";
	}

	function isEditMode(mode: "view" | "edit") {
		return mode === "edit";
	}

	function useGetBoardUUIDIfExist() {
		const boardUUID = board?.boardUUID;
		if (!boardUUID) {
			throw new Error("NOT_KNOWN_ERROR");
		}

		return boardUUID;
	}

	function handleAutoSaveBoard(mode: "view" | "edit") {
		const boardUUID = useGetBoardUUIDIfExist();
		isEditMode(mode) &&
			autoSaveBoardMutate({
				boardUUID: boardUUID,
				contents: boardContent,
			});
	}

	function handleSaveBoard() {
		const boardUUID = useGetBoardUUIDIfExist();
		mutate({ boardUUID: boardUUID, contents: boardContent });
	}

	const SAVE_BOARD_INTERVAL = 3000; // 3초

	return {
		boardContent,
		setBoardContent,
		pasteScrap,
		containers,
		setContainers,
		getNextContainerId,
		handleAddColumn,
		pasteSticker,
		handleSaveBoard,
		handleAutoSaveBoard,
		SAVE_BOARD_INTERVAL,
	};
};
