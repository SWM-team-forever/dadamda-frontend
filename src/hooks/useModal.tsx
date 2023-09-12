import { useAtom } from "jotai";
import { useCallback } from "react";

import modalAtom from "@/state/modalAtom";

import MemoCreateModalElement from "@/components/atoms/Modal/MemoCreateModalElement";
import ScrapCreateModalElement from "@/components/atoms/Modal/ScrapCreateModalElement";

export const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        setModal((prev) => { return { ...prev, isOpen: false } })
    }, [setModal]);

    const modalTypeMatching = {
        memoCreate: {
            title: '메모 추가하기',
            element: <MemoCreateModalElement />,
        },
        scrapCreate: {
            title: '스크랩 추가하기',
            element: <ScrapCreateModalElement />,
        }
    }

    const connectMemoWithScrapId = useCallback((scrapId: number) => {
        setModal((prev) => { return { ...prev, scrapId: scrapId } })
    }, [setModal]);

    const openModal = useCallback((
        type: string
    ) => {
        setModal({
            ...modalTypeMatching[type as keyof typeof modalTypeMatching],
            isOpen: true,
        })
    }, [setModal]);

    return { modal, closeModal, openModal, connectMemoWithScrapId };
}
