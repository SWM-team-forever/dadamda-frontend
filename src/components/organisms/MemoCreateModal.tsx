import styled from 'styled-components';

import theme from '../../assets/styles/theme';
import Button from '../atoms/DefaultButton';
import { ChangeEvent, useEffect, useState } from 'react';
import { POST_CREATE_MEMO_URL } from '../../secret';

interface MemoCreateModalProps {
    hideMemoCreateModal: () => void,
    scrapId: number,
}

function MemoCreateModal({ hideMemoCreateModal, scrapId }: MemoCreateModalProps) {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    function createMemo() {
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
            }).then((response) => response.json())
                .then(() => {
                    hideMemoCreateModal();
                })
                .catch(err => console.error(err));
    }

    return (
        <ModalWrapper>
            <ModalHeader>
                <ModalTitleContainer>
                    <EmphasizedTypography>메모 추가하기</EmphasizedTypography>
                    <DefaultTypography>추가할 메모를 입력해주세요.</DefaultTypography>
                </ModalTitleContainer>
                <IconContainer hideMemoCreateModal={hideMemoCreateModal} />
            </ModalHeader>
            <EditText placeholder="추가할 메모를 입력하세요." onChange={(e) => handleSetValue(e)} />
            <ModalFooter>
                <ButtonContainer>
                    <Button buttonStyle={'gray'} label={'취소하기'} isRound onClick={hideMemoCreateModal} />
                    <Button buttonStyle={'secondary'} label={'추가하기'} isRound onClick={createMemo} />
                </ButtonContainer>
            </ModalFooter>
        </ModalWrapper>
    );
}

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: calc(100% - 30px);
    border-radius: 4px;
    background-color: white;
    padding: 15px;
    gap: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    box-shadow: ${theme.style.shadow}; 
`

const DefaultTypography = styled.span`
    font-size: 12px;
    color: ${theme.color.text_gray_color};
`

const EmphasizedTypography = styled(DefaultTypography)`
    font-size: 20px;
    font-weight: bold;
`

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

const ModalTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const EditText = styled.textarea`
    font-size: 12px;
    border-radius: 4px;
    padding: 15px;
    background-color: ${theme.color.background_color};
    border: none;
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    resize: none;
`

const ModalFooter = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 5px;
`

interface IconContainerProps {
    hideMemoCreateModal: () => void;
}

function IconContainer({ hideMemoCreateModal }: IconContainerProps) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.color.text_gray_color} style={{ cursor: "pointer" }} onClick={hideMemoCreateModal}>
        <path d="M12 10.586L6.707 5.293C6.51839 5.11084 6.26579 5.01004 6.00359 5.01232C5.7414 5.0146 5.49058 5.11977 5.30518 5.30518C5.11977 5.49059 5.0146 5.7414 5.01232 6.0036C5.01004 6.26579 5.11084 6.51839 5.293 6.707L10.586 12L5.293 17.293C5.11084 17.4816 5.01004 17.7342 5.01232 17.9964C5.0146 18.2586 5.11977 18.5094 5.30518 18.6948C5.49058 18.8802 5.7414 18.9854 6.00359 18.9877C6.26579 18.99 6.51839 18.8892 6.707 18.707L12 13.414L17.293 18.707C17.4816 18.8892 17.7342 18.99 17.9964 18.9877C18.2586 18.9854 18.5094 18.8802 18.6948 18.6948C18.8802 18.5094 18.9854 18.2586 18.9877 17.9964C18.9899 17.7342 18.8892 17.4816 18.707 17.293L13.414 12L18.707 6.707C18.8025 6.61475 18.8787 6.50441 18.9311 6.3824C18.9835 6.2604 19.0111 6.12918 19.0122 5.9964C19.0134 5.86362 18.9881 5.73194 18.9378 5.60904C18.8875 5.48615 18.8133 5.37449 18.7194 5.2806C18.6255 5.18671 18.5138 5.11246 18.3909 5.06218C18.2681 5.01189 18.1364 4.98659 18.0036 4.98775C17.8708 4.9889 17.7396 5.01649 17.6176 5.0689C17.4956 5.1213 17.3852 5.19749 17.293 5.293L12 10.586Z" fill="#44546F" />
    </svg>);
}

export default MemoCreateModal;
