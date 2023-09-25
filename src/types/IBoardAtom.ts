import { TMemo, contentProps } from "@/types/ContentType"

export type Memo = TMemo;
export type Scrap = contentProps['content'];
export type ScrapOrMemo = (Memo | Scrap) & {
    columnId: string,
};
export type Column = {
    title?: string,
    columnId: string,
}

interface IBoardAtom {
    title: string,
    columnList: Column[],
    ScrapOrMemoList: ScrapOrMemo[],
    boardId: string | null,
}

export type {IBoardAtom};
