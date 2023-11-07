import { TMemo, contentProps } from "@/types/ContentType";

export type Memo = TMemo;
export type Scrap = contentProps["content"] & { id: string };
export type ScrapOrMemo = Memo | Scrap;
export type Column = {
	title?: string;
	columnId: string;
};

interface IBoardAtom {
	title: string;
	boardUUID: string | null;
	description?: string;
	tag?: string;
	type: "mine" | "shared" | "trending";
}

export type { IBoardAtom };
