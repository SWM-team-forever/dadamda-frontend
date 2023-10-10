import { ScrapOrMemo } from "@/types/IBoardAtom";
import { UniqueIdentifier } from "@dnd-kit/core";

interface IBoardContentAtom {
    [key: UniqueIdentifier]: ScrapOrMemo[]
}

export type {IBoardContentAtom};