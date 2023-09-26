import boardAtom from "@/state/boardAtom";
import { Column, Scrap, ScrapOrMemo } from "@/types/IBoardAtom";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAtom } from "jotai"
import { useState } from "react";

export const useBoardAtom = () => {
    const [board, setBoard] = useAtom(boardAtom);
    const [activeTask, setActiveTask] = useState<ScrapOrMemo | null>(null);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    
    const pasteScrap = (scrap: Scrap) => {
        setBoard((prev) => {
            const columnId = prev.columnList.length > 0 ? prev.columnList[0].columnId : '0';
            const taskId = (prev.ScrapOrMemoList.length + 1).toString();
            return {
                ...prev,
                ScrapOrMemoList: [
                    ...prev.ScrapOrMemoList,
                    { ...scrap, 
                        columnId: columnId, 
                        taskId: taskId 
                    },
                ],
                columnList: prev.columnList.length === 0 ? [{ columnId: '0', columnName: '기본' }] : prev.columnList,
            };
        });
    };

    const createNewColumn = () => {
        const columnToAdd: Column = {
            columnId: (board.columnList.length + 1).toString(),
            title: `Column ${board.columnList.length + 1}`,
        };
        setBoard((prev) => {
            return {
                ...prev,
                columnList: [...prev.columnList, columnToAdd],
            };
        })
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'column') {
            const column = event.active.data.current?.column;
            setActiveColumn(column);
            return;
        }

        if (event.active.data.current?.type === 'task') {
            const task = event.active.data.current?.task;
            setActiveTask(task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        if (!over) {
            return;
        }

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) {
            return;
        }

        setBoard((board) => {
            const overColumnIndex = board.columnList.findIndex((column) => column.columnId === overColumnId);
            const activeColumnIndex = board.columnList.findIndex((column) => column.columnId === activeColumnId);

            return {
                ...board,
                columnList: arrayMove(board.columnList, activeColumnIndex, overColumnIndex),
            }
        })
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) {
            return;
        }

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if (activeColumnId === overColumnId) {
            return;
        }

        const isActiveATask = active.data.current?.type === 'Task';
        const isOverATask = over.data.current?.type === 'Task';

        if (!isActiveATask) {
            return;
        }

        if (isActiveATask && isOverATask) {
            setBoard((board) => {
                const activeIndex = board.ScrapOrMemoList.findIndex((task) => task.columnId === activeColumnId);
                const overIndex = board.ScrapOrMemoList.findIndex((task) => task.columnId === overColumnId);

                board.ScrapOrMemoList[activeIndex].columnId = board.ScrapOrMemoList[overIndex].columnId;

                return {
                    ...board,
                    ScrapOrMemoList : arrayMove(board.ScrapOrMemoList, activeIndex, overIndex)
                }
            });
        }

        const isOverAColumn = over.data.current?.type === 'column';

        if (!isActiveATask && isOverAColumn) {
            console.log('cccc');
            setBoard((board) => {
                const activeIndex = board.ScrapOrMemoList.findIndex((task) => task.columnId === activeColumnId);

                board.ScrapOrMemoList[activeIndex].columnId = overColumnId.toString();

                return {
                    ...board,
                    ScrapOrMemoList : arrayMove(board.ScrapOrMemoList, activeIndex, activeIndex)
                }
            });
        }
    }

    return {
        board,
        setBoard,
        pasteScrap,
        createNewColumn,
        onDragStart,
        onDragEnd,
        onDragOver,
        activeTask,
        activeColumn,
    }
}
