import { useAtom } from "jotai";
import { useCallback } from "react";

import modalAtom from "@/state/modalAtom";

import MemoCreateModalElement from "@/components/atoms/Modal/MemoCreateModalElement";
import ScrapDeleteElementModal from "@/components/atoms/Modal/ScrapDeleteModalElement";

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
        scrapDelete: {
            title: '스크랩 삭제하기',
            element: <ScrapDeleteElementModal />,
        }
    }

    const connectMemoWithScrapId = useCallback((scrapId: number) => {
        setModal((prev) => {
            return { ...prev, scrapId: scrapId }
        })
    }, [setModal, modal]);

    const openModal = useCallback((
        type: string
    ) => {
        setModal((prev) => {
            return {
                ...prev,
                ...modalTypeMatching[type as keyof typeof modalTypeMatching],
                isOpen: true,
            }
        })
    }, [setModal]);

    return { modal, closeModal, openModal, connectMemoWithScrapId };
}
