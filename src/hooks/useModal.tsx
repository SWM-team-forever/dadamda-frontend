import { useAtom } from "jotai";
import { useCallback } from "react";

import modalAtom from "@/state/modalAtom";

import MemoCreateModalElement from "@/components/atoms/Modal/MemoCreateModalElement";

export const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        setModal((prev) => { return { ...prev, isOpen: false } })
    }, [setModal]);

    const modalTypeMatching = {
        memoCreate: {
            title: '메모 추가하기',
            element: <MemoCreateModalElement />,
        }
    }

    const openModal = useCallback((
        type: string
    ) => {
        setModal({
            ...modalTypeMatching[type as keyof typeof modalTypeMatching],
            isOpen: true,
        })
    }, [setModal]);

    return { modal, closeModal, openModal };
}