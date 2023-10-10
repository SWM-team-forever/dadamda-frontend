import { TMemo, contentProps } from "@/types/ContentType"

export type Memo = TMemo;
export type Scrap = contentProps['content'] & {id: string};
export type ScrapOrMemo = (Memo | Scrap);
export type Column = {
    title?: string,
    columnId: string,
}

interface IBoardAtom {
    title: string,
    boardId: string | null,
}

export type {IBoardAtom};
