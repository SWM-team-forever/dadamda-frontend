import { useAtom } from "jotai";
import { useCallback } from "react";

import modalAtom from "@/state/modalAtom";

import MemoCreateModalElement from "@/components/atoms/Modal/MemoCreateModalElement";
import LoginModalElement from "@/components/atoms/Modal/LoginModalElement";
import UserDeleteModalElement from "@/components/atoms/Modal/UserDeleteModalElement";
import ScrapDeleteElementModal from "@/components/atoms/Modal/ScrapDeleteModalElement";
import ScrapEditModalElement from "@/components/atoms/Modal/ScrapEditModalElement";
import ScrapCreateModalElement from "@/components/atoms/Modal/ScrapCreateModalElement";
import ScrapPasteModalElement from "@/components/atoms/Modal/ScrapPasteModalElement";
import BoardCreateModalElement from "@/components/atoms/Modal/BoardCreateModalElement";
import StickerPasteModalElement from "@/components/atoms/Modal/StickerPasteModalElement";
import BoardEditModalElement from "@/components/atoms/Modal/BoardEditModalElement";
import { logEvent } from "@/utility/amplitude";

import BoardPublicModalElement from "@/components/atoms/Modal/BoardPublicModalElement";
import BoardShareAndPublishModalElement from "@/components/atoms/Modal/BoardShareAndPublishModalElement";


export const useModal = () => {
    const [modal, setModal] = useAtom(modalAtom);

    const closeModal = useCallback(() => {
        setModal((prev) => { return { ...prev, isOpen: false } })
    }, [setModal]);

    const modalTypeMatching = {
        memoCreate: {
            title: '메모 추가하기',
            element: <MemoCreateModalElement />,
            position: 'center',
        },
        login: {
            title: '소셜 로그인하기',
            element: <LoginModalElement />,
            position: 'center',
        },
        userDelete: {
            title: '회원 탈퇴하기',
            element: <UserDeleteModalElement />,
            position: 'center',
        },
        scrapDelete: {
            title: '스크랩 삭제하기',
            element: <ScrapDeleteElementModal />,
            position: 'center',
        },
        scrapEdit: {
            title: '스크랩 편집하기',
            element: <ScrapEditModalElement />,
            position: 'center',
        },
        scrapCreate: {
            title: '스크랩 추가하기',
            element: <ScrapCreateModalElement />,
            position: 'center',
        },
        scrapCreateOnBoard: {
            title: '스크랩 추가하기',
            element: <ScrapPasteModalElement />,
            position: 'right',
        },
        boardCreate: {
            title: '보드 추가하기',
            element: <BoardCreateModalElement />,
            position: 'right',
        },
        stickerPaste: {
            title: '스티커 추가하기',
            element: <StickerPasteModalElement />,
            position: 'center',
        },
        boardEdit: {
            title: '보드 수정하기',
            element: <BoardEditModalElement />,
            position: 'right',
        },
        boardShare: {
            element: <BoardShareAndPublishModalElement />,
            position: 'center',
        },
        boardView: {
            element: <BoardPublicModalElement />,
            position: 'full',
        }
    }

    const connectMemoWithScrapId = useCallback((scrapId: number) => {
        setModal((prev) => {
            return { ...prev, scrapId: scrapId }
        })
    }, [setModal, modal]);

    const openModal = useCallback((type: string, redirectURL?: string) => {
        logEvent(`open_${type}_modal`);
        setModal((prev) => {
            return {
                ...prev,
                ...modalTypeMatching[type as keyof typeof modalTypeMatching],
                redirectURL: redirectURL,
                isOpen: true,
            }
        })
    }, [setModal]);

    return { modal, closeModal, openModal, connectMemoWithScrapId };
}
