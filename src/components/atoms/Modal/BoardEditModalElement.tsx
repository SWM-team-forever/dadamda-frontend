import { useEditBoard } from "@/api/board";
import theme from "@/assets/styles/theme";
import DeleteBoardButton from "@/components/atoms/Board/DeleteBoardButton";
import { useBoardAtom } from "@/hooks/useBoardAtom";
import { useModal } from "@/hooks/useModal";
import { MAX_BOARD_DESCRIPTION_LENGTH, MAX_BOARD_TITLE_LENGTH, useIsBlank, useIsLessThanLengthLimitation } from "@/hooks/useValidation";
import { logEvent } from "@/utility/amplitude";
import { Typography, TextareaAutosize, Box, Chip, Button, FormHelperText } from "@mui/material";
import { useState } from "react";

export const chipInformation = [
    {
        label: '#엔터테인먼트/예술',
        tagValue: "ENTERTAINMENT_ART",
    },
    {
        label: '#취미/여가/여행',
        tagValue: "HOBBY_TRAVEL",
    },
    {
        label: '#생활/노하우/쇼핑',
        tagValue: "LIFE_SHOPPING",
    },
    {
        label: '#지식/동향',
        tagValue: "KNOWLEDGE_TREND",
    }
];

function BoardEditModalElement() {
    const { board } = useBoardAtom();

    const [title, setTitle] = useState<string>(board.title || "");
    const handleTitleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    }

    const [description, setDescription] = useState<string>(board.description || "");
    const handleDescriptionValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const [selectedTag, setSelectedTag] = useState<string>(board.tag || "");
    const handleTagValue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedTag(e.currentTarget.getAttribute('data-tagValue') || "");
    }

    const { mutate } = useEditBoard();
    const { closeModal } = useModal();
    const handleEditBoardButtonClick = () => {
        (title && description && selectedTag && board.boardUUID) && mutate({
            title: title,
            description: description,
            tag: selectedTag,
            boardUUID: board.boardUUID,
        });
        logEvent('edit_board');
        closeModal();
    }

    const validateTitle = () => {
        if (useIsBlank(title)) {
            return '공백만 입력되었습니다.';
        }

        if (!useIsLessThanLengthLimitation(title, MAX_BOARD_TITLE_LENGTH)) {
            return `최대 ${MAX_BOARD_TITLE_LENGTH}글자까지만 입력 가능합니다.`;
        }

        return 'success';
    }

    const validateDescription = () => {
        if (useIsBlank(description)) {
            return '공백만 입력되었습니다.';
        }

        if (!useIsLessThanLengthLimitation(description, MAX_BOARD_DESCRIPTION_LENGTH)) {
            return `최대 ${MAX_BOARD_DESCRIPTION_LENGTH}글자까지만 입력 가능합니다.`;
        }

        return 'success';
    }

    const validateTag = () => {
        if (useIsBlank(selectedTag)) {
            return '태그는 꼭 선택해주셔야 합니다';
        }

        return 'success';
    }

    const isValidationSuccess = () => [validateTitle(), validateDescription(), validateTag()].every(element => element === 'success');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
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
                제목
            </Typography>
            <TextareaAutosize
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
                value={title}
                onChange={e => handleTitleValue(e)}
            />
            <FormHelperText
                sx={{
                    alignSelf: 'start',
                    color: '#f44336',
                }}
            >
                {validateTitle() === 'success' ? ' ' : validateTitle()}
            </FormHelperText>
            <Typography
                color={theme.color.Gray_090}
                variant="h3"
                sx={{
                    fontWeight: '600',
                    lineHeight: '150%',
                }}
            >
                설명
            </Typography>
            <TextareaAutosize
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
                value={description}
                onChange={e => handleDescriptionValue(e)}
            />
            <FormHelperText
                sx={{
                    alignSelf: 'start',
                    color: '#f44336',
                }}
            >
                {validateDescription() === 'success' ? ' ' : validateDescription()}
            </FormHelperText>
            <Typography
                color={theme.color.Gray_090}
                variant="h3"
                sx={{
                    fontWeight: '600',
                    lineHeight: '150%',
                }}
            >
                태그
            </Typography>
            <Box>
                {chipInformation.map((element, index) => {
                    const isSelected = selectedTag === element.tagValue;

                    return (
                        <Chip
                            key={index}
                            label={element.label}
                            sx={{
                                background: isSelected ? theme.color.Blue_080 : theme.color.Gray_020,
                                color: isSelected ? theme.color.Gray_020 : theme.color.Gray_090,
                                fontWeight: '400',
                                fontSize: '14px',
                                lineHeight: '160%',
                                borderRadius: '999px',
                                border: `1px solid ${isSelected ? theme.color.Blue_080 : theme.color.Gray_040}`,
                                padding: '10px',
                                paddingInline: '8px 14px 8px 14px',
                                m: '0 10px 10px 0',
                            }}
                            onClick={e => handleTagValue(e)}
                            data-tagValue={element.tagValue}
                        />
                    )
                })}
            </Box>
            <FormHelperText
                sx={{
                    alignSelf: 'start',
                    color: '#f44336',
                }}
            >
                {validateTag() === 'success' ? ' ' : validateTag()}
            </FormHelperText>
            <Button
                variant="contained"
                fullWidth
                onClick={handleEditBoardButtonClick}
                disabled={!isValidationSuccess()}
                size="large"
            >
                변경하기
            </Button>
            <DeleteBoardButton />
        </Box>
    );
}

export default BoardEditModalElement;
