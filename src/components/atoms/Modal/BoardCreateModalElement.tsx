import { usePostCreateBoard } from "@/api/board";
import theme from "@/assets/styles/theme";
import { useModal } from "@/hooks/useModal";
import { MAX_BOARD_DESCRIPTION_LENGTH, MAX_BOARD_TITLE_LENGTH, useIsBlank, useIsLessThanLengthLimitation } from "@/hooks/useValidation";
import { Typography, TextareaAutosize, Box, Chip, Button } from "@mui/material";
import { useState } from "react";

function BoardCreateModalElement() {
    const [title, setTitle] = useState<string>();
    const handleTitleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    }

    const [description, setDescription] = useState<string>();
    const handleDescriptionValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    }

    const [selectedTag, setSelectedTag] = useState<string>("");
    const handleTagValue = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedTag(e.currentTarget.getAttribute('data-tagValue') || "");
    }

    const chipInformation = [
        {
            label: '엔터테인먼트/예술',
            tagValue: "ENTERTAINMENT_ART",
        },
        {
            label: '취미/여가/여행',
            tagValue: "HOBBY_TRAVEL",
        },
        {
            label: '생활/노하우/쇼핑',
            tagValue: "LIFE_SHOPPING",
        },
        {
            label: '지식/동향',
            tagValue: "KNOWLEDGE_TREND",
        }
    ];

    const { mutate } = usePostCreateBoard();
    const { closeModal } = useModal();
    const handleCreateButtonClick = () => {
        (title && description && selectedTag) && mutate({
            name: title,
            description: description,
            tag: selectedTag,
        });
        closeModal();
    }

    const validateTitle = () => {
        return title && !useIsBlank(title) && useIsLessThanLengthLimitation(title, MAX_BOARD_TITLE_LENGTH);
    }

    const validateDescription = () => {
        return description && !useIsBlank(description) && useIsLessThanLengthLimitation(description, MAX_BOARD_DESCRIPTION_LENGTH);
    }

    const validateTag = () => {
        return selectedTag && !useIsBlank(selectedTag);
    }

    return (
        <Box>
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
                onChange={e => handleTitleValue(e)}
            />
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
                onChange={e => handleDescriptionValue(e)}
            />
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
                                background: isSelected ? theme.color.Blue_060 : theme.color.Gray_040,
                                color: theme.color.Gray_090,
                                fontWeight: '500',
                                fontSize: '14px',
                                lineHeight: '150%',
                                borderRadius: '8px',
                                padding: '10px',
                                m: '0 10px 10px 0',
                            }}
                            onClick={e => handleTagValue(e)}
                            data-tagValue={element.tagValue}
                        />
                    )
                })}
            </Box>
            <Button
                variant="contained"
                fullWidth
                onClick={handleCreateButtonClick}
                disabled={validateTitle() && validateDescription() && validateTag() ? false : true}
            >
                추가하기
            </Button>
        </Box>
    );
}

export default BoardCreateModalElement;
