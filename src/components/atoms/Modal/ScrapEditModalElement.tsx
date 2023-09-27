import { useEditScrap } from "@/api/scrap";
import theme from "@/assets/styles/theme";
import { MinusCircleIcon, PlusCircleIcon } from "@/components/atoms/Icon";
import ThumbnailImage from "@/components/atoms/ThumbnailImage";
import { useModal } from "@/hooks/useModal";
import { useSelectedScrap } from "@/hooks/useSelectedScrap";
import { MAX_SCRAP_AUTHOR_LENGTH, MAX_SCRAP_BLOGNAME_LENGTH, MAX_SCRAP_CHANNELNAME_LENGTH, MAX_SCRAP_DESCRIPTION_LENGTH, MAX_SCRAP_PRICE_LENGTH, MAX_SCRAP_SITENAME_LENGTH, MAX_SCRAP_TITLE_LENGTH, useIsBlank, useIsEntered, useIsLessThanLengthLimitation } from "@/hooks/useValidation";
import { Box, Button, FormControl, FormHelperText, TextareaAutosize, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

function ScrapEditModalElement() {
    const { selectedScrap, removeSelectedScrap } = useSelectedScrap();
    const { closeModal } = useModal();

    let content = selectedScrap;
    const [title, setTitle] = useState<string | undefined | null>(content.title);
    const [description, setDescription] = useState<string | undefined | null>(content.description);
    const [siteName, setSiteName] = useState<string | undefined | null>(content.siteName);
    const [author, setAuthor] = useState<string | undefined | null>(content.author);
    const [blogName, setBlogName] = useState<string | undefined | null>(content.blogName);
    const [price, setPrice] = useState<string | undefined | null>(content.price);
    const [channelName, setChannelName] = useState<string | undefined | null>(content.channelName);
    const [playTime, setPlayTime] = useState<string | undefined | null>(content.playTime);
    const [watchedCnt, setWatchedCnt] = useState<string | undefined | null>(content.watchedCnt);

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
            limitation: MAX_SCRAP_TITLE_LENGTH,
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
            limitation: MAX_SCRAP_DESCRIPTION_LENGTH,
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
            limitation: MAX_SCRAP_SITENAME_LENGTH,
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
            limitation: MAX_SCRAP_AUTHOR_LENGTH,
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
            limitation: MAX_SCRAP_BLOGNAME_LENGTH,
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
            limitation: MAX_SCRAP_PRICE_LENGTH,
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
            limitation: MAX_SCRAP_CHANNELNAME_LENGTH,
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
            limitation: 0,
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
            limitation: 0,
            showState: () => setWatchedCnt(content.watchedCnt),
            setState: setWatchedCnt,
            setIsDeleted(value: boolean) {
                editalbeContent.watchedCnt.isDeleted = value;
            }
        },
    };

    const validation = ({ text, textLimitation }: { text: string, textLimitation: number }) => {
        if (!useIsLessThanLengthLimitation(text, textLimitation)) {
            return `최대 ${textLimitation}글자까지만 입력 가능합니다.`;
        }

        if (!useIsEntered(text)) {
            return '내용을 입력해주세요.';
        }

        if (useIsBlank(text)) {
            return '공백만 입력되었습니다.';
        }

        return 'success';
    }

    function checkIsEveryValidationSuccessed() {
        for (const key in editalbeContent) {
            const element = editalbeContent[key as keyof typeof editalbeContent];
            if (!element.isDeleted
                && typeof (element.state) === 'string'
                && validation({
                    text: element.state,
                    textLimitation: element.limitation
                }) !== 'success') {
                return false;
            }
        }

        return true;
    }

    const [token, setToken] = useState<string | null>(null);
    function initiateEditableContent() {
        const defaultContentMenu = {
            other: ['title', 'description'],
            article: ['title', 'description', 'siteName', 'author', 'blogName'],
            product: ['title', 'siteName', 'price'],
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
    const { mutate } = useEditScrap();

    const editScrap = () => {
        for (const key in editalbeContent) {
            content = {
                ...content,
                [key]: editalbeContent[key as keyof typeof editalbeContent].state,
            }
        }

        token && mutate({ token, content });
    }

    const contentRendering = () => {
        const renderingResult = [];
        for (const key in editalbeContent) {
            const element = editalbeContent[key as keyof typeof editalbeContent];
            (element.isDeleted) && renderingResult.push(
                deletedContentRendering(element)
            );
            (!element.isDeleted && isNotNullOrUndefined(element.state)) && renderingResult.push(
                existContentRendering(element, key)
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
                key={element.label + content.scrapId}
            >
                <Box
                    onClick={() => {
                        content[element.label as keyof typeof content] ? element.setState(content[element.label as keyof typeof content]) : element.setState('');
                        element.setIsDeleted(false);
                    }}
                    sx={{
                        cursor: 'pointer',
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
                key={element.label + content.scrapId}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: '8px',
                    }}
                >
                    <Box
                        onClick={() => {
                            element.setState(null);
                            element.setIsDeleted(true);
                        }}
                        sx={{
                            cursor: 'pointer',
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
                <FormControl>
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
                    <FormHelperText
                        sx={{
                            alignSelf: 'start',
                            color: '#f44336',
                        }}
                    >
                        {validation({
                            text: element.state,
                            textLimitation: element.limitation,
                        }) !== 'success'
                            ? validation({
                                text: element.state,
                                textLimitation: element.limitation,
                            })
                            : ' '}
                    </FormHelperText>
                </FormControl>
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
            <Button
                fullWidth
                variant="contained"
                sx={{
                    backgroundColor: theme.color.Blue_080,
                    borderRadius: '4px',
                    fontSize: '16px',
                    fontWeight: '600',
                    lineHeight: '150%',
                    p: '8px 0',
                }}
                onClick={() => {
                    closeModal();
                    removeSelectedScrap();
                    editScrap()
                }}
                disabled={!checkIsEveryValidationSuccessed()}
            >
                변경하기
            </Button>
        </Box>
    )
}

export default ScrapEditModalElement;
