import { CircularProgress, TextareaAutosize } from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import styled from 'styled-components';
import theme from "../../../assets/styles/theme";
import { useDefaultSnackbar } from "../../../hooks/useWarningSnackbar";
import { POST_CREATE_MEMO_URL } from "../../../secret";
import Memo from "../../molcules/Memo";
import { useCategoryItemList } from "../../../context/CategoryListContext";
import ColumnContainer from "../ColumnContainer";
import { contentProps } from "../../../types/ContentType";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGetArticleScrap } from "../../../api/scrap";
import { useSnackbar } from "notistack";
import { usePostCreateMemo } from "../../../api/memo";

interface MemoAreaElementProps {
    content: contentProps['content'],
}

export function MemoAreaElement({ content }: MemoAreaElementProps) {
    const [textAreaValue, setTextAreaValue] = useState('');
    const { memoList, scrapId } = content;
    const token = localStorage.getItem('token');

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    };

    const { mutate, isLoading, isError } = usePostCreateMemo();

    function onEnterPress(e: any) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            token && mutate({ token, scrapId, textAreaValue });
            e.target.value = '';
        }
    }

    if (isLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    if (isError) {
        useDefaultSnackbar('메모 생성에 실패하였습니다.', 'error');
    }

    return (
        <ColumnContainer
            style={{
                padding: '10px',
                boxSizing: 'border-box',
                gap: '10px',
            }}>
            {
                memoList?.map((memo) => {
                    return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
                })
            }
            <div
                style={{
                    width: '100%',
                }}>
                <StyledTextArea placeholder='메모를 입력해주세요.' minRows={4} onKeyDown={onEnterPress} onChange={e => handleSetValue(e)} />
            </div>
        </ColumnContainer>
    )
}

const StyledTextArea = styled(TextareaAutosize)`
    line-height: 1.2;
    resize: none;
    height: auto;
    width: 100%;
    box-sizing: border-box;
    background: ${theme.color.background_color};
    border: none;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    color: ${theme.color.text_gray_color};
    font-family: 'NanumSquare', sans-serif;
    &::placeholder {
        color: ${theme.color.text_gray_color};
    }
`;
