import { TextareaAutosize } from "@mui/material";
import { ChangeEvent, useState } from "react";
import styled from 'styled-components';
import theme from "../../../assets/styles/theme";
import { useDefaultSnackbar } from "../../../hooks/useWarningSnackbar";
import { POST_CREATE_MEMO_URL } from "../../../secret";
import Memo from "../../molcules/Memo";

export function MemoAreaElement({ memoList, scrapId, updateMemoList }) {
    const [textAreaValue, setTextAreaValue] = useState('');

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    let createdMemoCount = 0;

    function onEnterPress(e: any) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            createMemo();
            createdMemoCount += 1;
            const changedMemoList = [...memoList, {
                memoId: -1 * createdMemoCount,
                memoText: e.target.value,
            }];
            updateMemoList(changedMemoList);
            e.target.value = '';
        }
    }

    function createMemo() {
        const token = localStorage.getItem('token');
        token &&
            fetch(POST_CREATE_MEMO_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
                body: JSON.stringify({
                    scrapId: scrapId,
                    memoText: textAreaValue,
                }),
            }).then((response) => {
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
                .then(() => {
                    useDefaultSnackbar('메모가 추가되었습니다.', 'success');
                })
        // .catch(err => setError(err.message));
    }

    return (
        <>
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
        </>
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
`;
