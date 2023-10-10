import boardContainersAtom from "@/state/boardContainersAtom";
import boardContentAtom from "@/state/boardContentAtom";
import { contentProps } from "@/types/ContentType";
import { useAtom } from "jotai"
import { useState } from "react";
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

        console.log('pasteScrap', newBoard);
        console.log('pasteScrap', Object.keys(newBoard));
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
    }
}
