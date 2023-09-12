import theme from "@/assets/styles/theme";
import { MinusCircleIcon, PlusCircleIcon } from "@/components/atoms/Icon";
import TextArea from "@/components/atoms/TextArea";
import ThumbnailImage from "@/components/atoms/ThumbnailImage";
import { useModal } from "@/hooks/useModal";
import { useSelectedScrap } from "@/hooks/useSelectedScrap";
import { useDefaultSnackbar } from "@/hooks/useWarningSnackbar";
import { EDIT_sCRAP_URL } from "@/secret";
import { Box, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

function ScrapEditModalElement() {
    const { selectedScrap } = useSelectedScrap();
    const { closeModal } = useModal();

    let content = selectedScrap;
    const [title, setTitle] = useState<string | undefined | null>(content.title);
    const [description, setDescription] = useState<string | undefined | null>(content.description);
    const [siteName, setSiteName] = useState<string | undefined | null>(content.siteName);
    const [author, setAuthor] = useState<string | undefined | null>(content.author);
    const [blogName, setBlogName] = useState<string | undefined | null>(content.blogName);
    const [publishedDate, setPublishedDate] = useState<number | undefined | null>(content.publishedDate);
    const [price, setPrice] = useState<string | undefined | null>(content.price);
    const [channelName, setChannelName] = useState<string | undefined | null>(content.channelName);
    const [playTime, setPlayTime] = useState<string | undefined | null>(content.playTime);
    const [watchedCnt, setWatchedCnt] = useState<string | undefined | null>(content.watchedCnt);
    const [memos, setMemos] = useState<{
        memoId: number,
        memoImageURL?: string,
        memoText?: string,
    }[] | undefined>(content.memoList);

    const isNotNullOrUndefined = (state: any) => {
        if (state === null || state === undefined) {
            return false;
        }

        return true;
    }

    const editalbeContent = {
        'title': {
            label: '제목',
            isDeleteable: true,
            isDeleted: false,
            state: title,
            showState: () => { setTitle(content.title) },
            setState: setTitle,
            setIsDeleted(value: boolean) {
                editalbeContent.title.isDeleted = value;
            }
        },
        'description': {
            label: '설명',
            isDeleteable: true,
            isDeleted: false,
            state: description,
            showState: () => setDescription(content.description),
            setState: setDescription,
            setIsDeleted(value: boolean) {
                editalbeContent.description.isDeleted = value;
            }
        },
        'siteName': {
            label: '사이트명',
            isDeleteable: true,
            isDeleted: false,
            state: siteName,
            showState: () => setSiteName(content.siteName),
            setState: setSiteName,
            setIsDeleted(value: boolean) {
                editalbeContent.siteName.isDeleted = value;
            }
        },
        'author': {
            label: '저자',
            isDeleteable: true,
            isDeleted: false,
            state: author,
            showState: () => setAuthor(content.author),
            setState: setAuthor,
            setIsDeleted(value: boolean) {
                editalbeContent.author.isDeleted = value;
            }
        },
        'blogName': {
            label: '블로그명',
            isDeleteable: true,
            isDeleted: false,
            state: blogName,
            showState: () => setBlogName(content.blogName),
            setState: setBlogName,
            setIsDeleted(value: boolean) {
                editalbeContent.blogName.isDeleted = value;
            }
        },
        'price': {
            label: '가격',
            isDeleteable: true,
            isDeleted: false,
            state: price,
            showState: () => setPrice(content.price),
            setState: setPrice,
            setIsDeleted(value: boolean) {
                editalbeContent.price.isDeleted = value;
            }
        },
        'channelName': {
            label: '채널명',
            isDeleteable: true,
            isDeleted: false,
            state: channelName,
            showState: () => setChannelName(content.channelName),
            setState: setChannelName,
            setIsDeleted(value: boolean) {
                editalbeContent.channelName.isDeleted = value;
            }
        },
        'playTime': {
            label: '영상 길이',
            isDeleteable: true,
            isDeleted: false,
            state: playTime,
            showState: () => setPlayTime(content.playTime),
            setState: setPlayTime,
            setIsDeleted(value: boolean) {
                editalbeContent.playTime.isDeleted = value;
            }
        },
        'watchedCnt': {
            label: '조회수',
            isDeleteable: false,
            isDeleted: false,
            state: watchedCnt,
            showState: () => setWatchedCnt(content.watchedCnt),
            setState: setWatchedCnt,
            setIsDeleted(value: boolean) {
                editalbeContent.watchedCnt.isDeleted = value;
            }
        },
    };

    const [token, setToken] = useState<string | null>(null);
    function initiateEditableContent() {
        const defaultContentMenu = {
            other: ['title', 'description'],
            article: ['title', 'description', 'siteName', 'author', 'blogName'],
            product: ['title', 'description', 'siteName', 'price'],
            video: ['title', 'description', 'siteName', 'channelName'],
        };

        defaultContentMenu[content.dtype as keyof typeof defaultContentMenu].map((name) => {
            const element = editalbeContent[name as keyof typeof editalbeContent];
            if (!isNotNullOrUndefined(element.state)) {
                element.isDeleted = true;
            }
        });
    }

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    });

    initiateEditableContent();

    const editScrap = () => {
        for (const key in editalbeContent) {
            content = {
                ...content,
                [key]: editalbeContent[key as keyof typeof editalbeContent].state,
            }
        }

        const url = EDIT_sCRAP_URL;
        token &&
            fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
                body: JSON.stringify(content),
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
                    closeModal();
                    useDefaultSnackbar('스크랩이 변경되었습니다.', 'success');
                })
                .then(() => {
                    closeModal();
                })
    }

    const contentRendering = () => {
        const renderingResult = [];
        for (const key in editalbeContent) {
            const element = editalbeContent[key as keyof typeof editalbeContent];
            renderingResult.push(
                element.isDeleted ? deletedContentRendering(element) : existContentRendering(element, key)
            );
        }

        return renderingResult;
    }

    const deletedContentRendering = (element: any) => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    gap: '8px',
                }}
            >
                <Box
                    onClick={() => {
                        element.setState('');
                        element.setIsDeleted(false);
                    }}
                >
                    <PlusCircleIcon width="24px" height="24px" fill={theme.color.Blue_080} />
                </Box>
                <Typography
                    color={theme.color.Gray_090}
                    variant="h3"
                    sx={{
                        fontWeight: '600',
                        lineHeight: '150%',
                    }}
                >
                    {element.label}
                </Typography>
            </Box>
        )
    }

    const existContentRendering = (element: any, key: string) => {
        const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            element.setState(e.target.value);
        }

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px',
                    }}
                >
                    <Box
                        onClick={() => {
                            element.setState('');
                        }}
                    >
                        <MinusCircleIcon width="24px" height="24px" fill={theme.color.Gray_070} />
                    </Box>
                    <Typography
                        color={theme.color.Gray_090}
                        variant="h3"
                        sx={{
                            fontWeight: '600',
                            lineHeight: '150%',
                        }}
                    >
                        {element.label}
                    </Typography>
                </Box>
                <TextareaAutosize
                    defaultValue={content[key as keyof typeof content] as string}
                    style={{
                        resize: 'none',
                        background: '#FFF',
                        border: `1px solid ${theme.color.Gray_040}`,
                        width: '100%',
                        boxSizing: 'border-box',
                        borderRadius: '8px',
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: '150%',
                        color: theme.color.Gray_090,
                    }}
                    onChange={e => handleSetValue(e)}
                />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                height: '500px',
                width: '100%',
                overflowY: 'scroll',
                overflowX: 'hidden',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    width: '100%',
                }}
            >
                <Typography
                    color={theme.color.Gray_090}
                    variant="h3"
                    sx={{
                        fontWeight: '600',
                        lineHeight: '150%',
                    }}
                >
                    미리보기 이미지
                </Typography>
                {selectedScrap?.thumbnailUrl && <ThumbnailImage thumbnailUrl={selectedScrap?.thumbnailUrl} />}
            </Box>
            {contentRendering()}
        </Box>
    )
}

interface AddableElementProps {
    elementTitle: string,
    onClick: () => void,
}

function PlusIconContainer() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5ZM4.523 4.52301V2.97901C4.523 2.91637 4.53534 2.85435 4.55931 2.79647C4.58328 2.7386 4.61842 2.68602 4.66271 2.64172C4.707 2.59743 4.75959 2.56229 4.81746 2.53832C4.87533 2.51435 4.93736 2.50201 5 2.50201C5.06264 2.50201 5.12467 2.51435 5.18254 2.53832C5.24041 2.56229 5.29299 2.59743 5.33729 2.64172C5.38158 2.68602 5.41672 2.7386 5.44069 2.79647C5.46466 2.85435 5.477 2.91637 5.477 2.97901V4.52301H7.021C7.08364 4.52301 7.14567 4.53535 7.20354 4.55932C7.26141 4.58329 7.314 4.61843 7.35829 4.66272C7.40258 4.70702 7.43772 4.7596 7.46169 4.81747C7.48566 4.87535 7.498 4.93737 7.498 5.00001C7.498 5.06265 7.48566 5.12468 7.46169 5.18255C7.43772 5.24043 7.40258 5.29301 7.35829 5.3373C7.314 5.3816 7.26141 5.41673 7.20354 5.4407C7.14567 5.46468 7.08364 5.47701 7.021 5.47701H5.477V7.02101C5.477 7.08365 5.46466 7.14568 5.44069 7.20355C5.41672 7.26143 5.38158 7.31401 5.33729 7.3583C5.29299 7.4026 5.24041 7.43773 5.18254 7.46171C5.12467 7.48568 5.06264 7.49801 5 7.49801C4.93736 7.49801 4.87533 7.48568 4.81746 7.46171C4.75959 7.43773 4.707 7.4026 4.66271 7.3583C4.61842 7.31401 4.58328 7.26143 4.55931 7.20355C4.53534 7.14568 4.523 7.08365 4.523 7.02101V5.47701H2.979C2.91636 5.47701 2.85433 5.46468 2.79646 5.4407C2.73859 5.41673 2.686 5.3816 2.64171 5.3373C2.59742 5.29301 2.56228 5.24043 2.53831 5.18255C2.51434 5.12468 2.502 5.06265 2.502 5.00001C2.502 4.93737 2.51434 4.87535 2.53831 4.81747C2.56228 4.7596 2.59742 4.70702 2.64171 4.66272C2.686 4.61843 2.73859 4.58329 2.79646 4.55932C2.85433 4.53535 2.91636 4.52301 2.979 4.52301H4.523Z" fill="#44546F" />
        </svg>
    )
}

function AddableElement({ elementTitle, onClick }: AddableElementProps) {
    return (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }} onClick={onClick}>
            <PlusIconContainer />
            <Typography>{elementTitle}</Typography>
        </div>
    )
}

export default ScrapEditModalElement;
