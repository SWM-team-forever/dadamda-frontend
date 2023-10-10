import boardContainersAtom from "@/state/boardContainersAtom";
import boardContentAtom from "@/state/boardContentAtom";
import { TMemo, contentProps } from "@/types/ContentType";
import { useAtom } from "jotai"
import { unstable_batchedUpdates } from "react-dom";

export const useBoardContentAtom = () => {
    const [boardContent, setBoardContent] = useAtom(boardContentAtom);
    const [containers, setContainers] = useAtom(boardContainersAtom);

    function pasteScrap(scrap: contentProps['content']) {
        const firstColumn = Object.keys(boardContent)[0];
        const newBoard = firstColumn ? {
            ...boardContent,
            [firstColumn]: [
                ...boardContent[firstColumn],
                { ...scrap, id: `${scrap.scrapId + Math.random()}` },
            ],
        } : {
            [getNextContainerId()]: [{ ...scrap, id: `${scrap.scrapId + Math.random()}` }],
        };

        setBoardContent(newBoard);
        setContainers(Object.keys(newBoard));
    }

    function pasteSticker(sticker: TMemo) {
        const firstColumn = Object.keys(boardContent)[0];
        const newBoard = firstColumn ? {
            ...boardContent,
            [firstColumn]: [
                ...boardContent[firstColumn],
                { ...sticker, id: `${sticker.memoId + Math.random()}` },
            ],
        } : {
            [getNextContainerId()]: [{ ...sticker, id: `${sticker.memoId + Math.random()}` }],
        };

        setBoardContent(newBoard);
        setContainers(Object.keys(newBoard));
    }

    function handleAddColumn() {
        const newContainerId = getNextContainerId();

        unstable_batchedUpdates(() => {
            setContainers((containers) => [...containers, newContainerId]);
            setBoardContent((items) => ({
                ...items,
                [newContainerId]: [],
            }));
        });
    }

    function getNextContainerId() {
        const containerIds = Object.keys(boardContent);
        const lastContainerId = containerIds[containerIds.length - 1];

        return lastContainerId ? String.fromCharCode(lastContainerId.charCodeAt(0) + 1): 'A';
    }

    return {
        boardContent,
        setBoardContent,
        pasteScrap,
        containers,
        setContainers,
        getNextContainerId,
        handleAddColumn,
        pasteSticker,
    }
}
