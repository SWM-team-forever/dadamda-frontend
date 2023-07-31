import styled from 'styled-components';

import TextArea from '../atoms/TextArea';
import theme from '../../assets/styles/theme';
import Button from '../atoms/DefaultButton';
import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import MemoTextArea from '../molcules/MemoTextArea';

interface ScrapEditModalProps {
    hideScrapEditModal: () => void,
    content: {
        title?: string,
        description?: string,
        siteName?: string,
        author?: string,
        blogName?: string,
        publishedDate?: string,
        price?: string,
        channelName?: string,
        playTime?: string,
        watchedCnt?: string,
        memoList?: {
            memoId: number,
            memoImageURL?: string,
            memoText?: string,
        }[],
    },
}

let createdMemoCount = 0;

function ScrapEditModal({ hideScrapEditModal, content }: ScrapEditModalProps) {
    const [title, setTitle] = useState<string | undefined>(content.title);
    const [description, setDescription] = useState<string | undefined>(content.description);
    const [siteName, setSiteName] = useState<string | undefined>(content.siteName);
    const [author, setAuthor] = useState<string | undefined>(content.author);
    const [blogName, setBlogName] = useState<string | undefined>(content.blogName);
    const [publishedDate, setPublishedDate] = useState<string | undefined>(content.publishedDate);
    const [price, setPrice] = useState<string | undefined>(content.price);
    const [channelName, setChannelName] = useState<string | undefined>(content.channelName);
    const [playTime, setPlayTime] = useState<string | undefined>(content.playTime);
    const [watchedCnt, setWatchedCnt] = useState<string | undefined>(content.watchedCnt);
    const [memos, setMemos] = useState<{
        memoId: number,
        memoImageURL?: string,
        memoText?: string,
    }[] | undefined>(content.memoList);

    const editalbeContent = [
        {
            name: 'title',
            label: '제목',
            isDeleteable: true,
            state: title,
            showState: () => { setTitle(content.title) },
            hideState: () => { setTitle(undefined) },
        },
        {
            name: 'description',
            label: '설명',
            isDeleteable: true,
            state: description,
            showState: () => setDescription(content.description),
            hideState: () => setDescription(undefined),
        },
        {
            name: 'siteName',
            label: '사이트명',
            isDeleteable: true,
            state: siteName,
            showState: () => setSiteName(content.siteName),
            hideState: () => setSiteName(undefined),
        },
        {
            name: 'author',
            label: '저자',
            isDeleteable: true,
            state: author,
            showState: () => setAuthor(content.author),
            hideState: () => setAuthor(undefined),
        },
        {
            name: 'blogname',
            label: '블로그명',
            isDeleteable: true,
            state: blogName,
            showState: () => setBlogName(content.blogName),
            hideState: () => setBlogName(undefined),
        },
        {
            name: 'publishedDate',
            label: '게시일',
            isDeleteable: true,
            state: publishedDate,
            showState: () => setPublishedDate(content.publishedDate),
            hideState: () => setPublishedDate(undefined),
        },
        {
            name: 'price',
            label: '가격',
            isDeleteable: true,
            state: price,
            showState: () => setPrice(content.price),
            hideState: () => setPrice(undefined),
        },
        {
            name: 'channelName',
            label: '채널명',
            isDeleteable: true,
            price: channelName,
            showState: () => setChannelName(content.channelName),
            hideState: () => setChannelName(undefined),
        },
        {
            name: 'playTime',
            label: '재생 시간',
            isDeleteable: true,
            state: playTime,
            showState: () => setPlayTime(content.playTime),
            hideState: () => setPlayTime(undefined),
        },
        {
            name: 'watchedCnt',
            label: '조회수',
            isDeleteable: true,
            state: watchedCnt,
            showState: () => setWatchedCnt(content.watchedCnt),
            hideState: () => setWatchedCnt(undefined),
        },
    ];

    const emptyMemoText = '메모를 입력하세요';
    const createMemo = () => {
        createdMemoCount += 1;
        setMemos([...(memos || []), {
            memoId: -1 * createdMemoCount,
            memoText: emptyMemoText,
        }]);
    };

    return (
        <ModalWrapper>
            <ModalHeader>
                <ModalTitleContainer>
                    <EmphasizedTypography>스크랩 수정하기</EmphasizedTypography>
                </ModalTitleContainer>
                <IconContainer hideScrapEditModal={hideScrapEditModal} />
            </ModalHeader>
            <ContentWrapper>
                {editalbeContent.map(element => {
                    return (content[element.name as keyof typeof content] && element.state) && <TextArea labelText={element.label} defaultValue={content[element.name as keyof typeof content] as string} hideState={element.hideState} />
                })}
                {memos &&
                    <MemoTextArea memos={memos} setMemos={setMemos} />
                }
                <ContentAddSection>
                    <DefaultTypography>추가하기</DefaultTypography>
                    {editalbeContent.map(element => {
                        return (content[element.name as keyof typeof content] && !element.state) && <AddableElement elementTitle={element.label} onClick={element.showState} />
                    })}
                    <AddableElement elementTitle={'메모'} onClick={() => createMemo()} />
                </ContentAddSection>
            </ContentWrapper>
            <ModalFooter>
                <ButtonContainer>
                    <Button buttonStyle={'gray'} label={'취소하기'} isRound onClick={() => hideScrapEditModal()} />
                    <Button buttonStyle={'secondary'} label={'변경하기'} isRound />
                </ButtonContainer>
            </ModalFooter>
        </ModalWrapper >
    );
}


const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 450px;
    width: calc(100vw - 30px);
    max-height: 90%;
    overflow: auto;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: white;
    padding: 15px;
    gap: 15px;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 10;
    box-shadow: ${theme.style.shadow};
    transform: translate(-50%, -50%);
`

const DefaultTypography = styled.span`
    font-size: 12px;
    color: ${theme.color.text_gray_color};
    font-weight: 700;
`

const EmphasizedTypography = styled(DefaultTypography)`
    font-size: 20px;
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

const ModalFooter = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 5px;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ContentAddSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

interface IconContainerProps {
    hideScrapEditModal: () => void;
}

function IconContainer({ hideScrapEditModal }: IconContainerProps) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={theme.color.text_gray_color} style={{ cursor: "pointer" }} onClick={() => hideScrapEditModal()}>
        <path d="M12 10.586L6.707 5.293C6.51839 5.11084 6.26579 5.01004 6.00359 5.01232C5.7414 5.0146 5.49058 5.11977 5.30518 5.30518C5.11977 5.49059 5.0146 5.7414 5.01232 6.0036C5.01004 6.26579 5.11084 6.51839 5.293 6.707L10.586 12L5.293 17.293C5.11084 17.4816 5.01004 17.7342 5.01232 17.9964C5.0146 18.2586 5.11977 18.5094 5.30518 18.6948C5.49058 18.8802 5.7414 18.9854 6.00359 18.9877C6.26579 18.99 6.51839 18.8892 6.707 18.707L12 13.414L17.293 18.707C17.4816 18.8892 17.7342 18.99 17.9964 18.9877C18.2586 18.9854 18.5094 18.8802 18.6948 18.6948C18.8802 18.5094 18.9854 18.2586 18.9877 17.9964C18.9899 17.7342 18.8892 17.4816 18.707 17.293L13.414 12L18.707 6.707C18.8025 6.61475 18.8787 6.50441 18.9311 6.3824C18.9835 6.2604 19.0111 6.12918 19.0122 5.9964C19.0134 5.86362 18.9881 5.73194 18.9378 5.60904C18.8875 5.48615 18.8133 5.37449 18.7194 5.2806C18.6255 5.18671 18.5138 5.11246 18.3909 5.06218C18.2681 5.01189 18.1364 4.98659 18.0036 4.98775C17.8708 4.9889 17.7396 5.01649 17.6176 5.0689C17.4956 5.1213 17.3852 5.19749 17.293 5.293L12 10.586Z" fill="#44546F" />
    </svg>);
}

function PlusIconContainer() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5ZM4.523 4.52301V2.97901C4.523 2.91637 4.53534 2.85435 4.55931 2.79647C4.58328 2.7386 4.61842 2.68602 4.66271 2.64172C4.707 2.59743 4.75959 2.56229 4.81746 2.53832C4.87533 2.51435 4.93736 2.50201 5 2.50201C5.06264 2.50201 5.12467 2.51435 5.18254 2.53832C5.24041 2.56229 5.29299 2.59743 5.33729 2.64172C5.38158 2.68602 5.41672 2.7386 5.44069 2.79647C5.46466 2.85435 5.477 2.91637 5.477 2.97901V4.52301H7.021C7.08364 4.52301 7.14567 4.53535 7.20354 4.55932C7.26141 4.58329 7.314 4.61843 7.35829 4.66272C7.40258 4.70702 7.43772 4.7596 7.46169 4.81747C7.48566 4.87535 7.498 4.93737 7.498 5.00001C7.498 5.06265 7.48566 5.12468 7.46169 5.18255C7.43772 5.24043 7.40258 5.29301 7.35829 5.3373C7.314 5.3816 7.26141 5.41673 7.20354 5.4407C7.14567 5.46468 7.08364 5.47701 7.021 5.47701H5.477V7.02101C5.477 7.08365 5.46466 7.14568 5.44069 7.20355C5.41672 7.26143 5.38158 7.31401 5.33729 7.3583C5.29299 7.4026 5.24041 7.43773 5.18254 7.46171C5.12467 7.48568 5.06264 7.49801 5 7.49801C4.93736 7.49801 4.87533 7.48568 4.81746 7.46171C4.75959 7.43773 4.707 7.4026 4.66271 7.3583C4.61842 7.31401 4.58328 7.26143 4.55931 7.20355C4.53534 7.14568 4.523 7.08365 4.523 7.02101V5.47701H2.979C2.91636 5.47701 2.85433 5.46468 2.79646 5.4407C2.73859 5.41673 2.686 5.3816 2.64171 5.3373C2.59742 5.29301 2.56228 5.24043 2.53831 5.18255C2.51434 5.12468 2.502 5.06265 2.502 5.00001C2.502 4.93737 2.51434 4.87535 2.53831 4.81747C2.56228 4.7596 2.59742 4.70702 2.64171 4.66272C2.686 4.61843 2.73859 4.58329 2.79646 4.55932C2.85433 4.53535 2.91636 4.52301 2.979 4.52301H4.523Z" fill="#44546F" />
        </svg>
    )
}

interface AddableElementProps {
    elementTitle: string,
    onClick: () => void,
}

function AddableElement({ elementTitle, onClick }: AddableElementProps) {
    return (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} onClick={onClick}>
            <PlusIconContainer />
            <DefaultTypography>{elementTitle}</DefaultTypography>
        </div>
    )
}

export default ScrapEditModal;
