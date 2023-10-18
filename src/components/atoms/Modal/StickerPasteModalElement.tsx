import { Box, Button, FormControl, FormHelperText, OutlinedInput, Typography } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';

import theme from '@/assets/styles/theme';
import { useModal } from '@/hooks/useModal';
import { MAX_MEMO_LENGTH, useIsBlank, useIsEntered, useIsLessThanLengthLimitation } from '@/hooks/useValidation';
import { useBoardContentAtom } from '@/hooks/useBoardContentAtom';
import { useGetCurrentTimeInUnixTime } from '@/hooks/useCalculateDateDiff';
import { logEvent } from '@/utility/amplitude';

function StickerPasteModalElement() {
    const { closeModal } = useModal();
    const [textAreaValue, setTextAreaValue] = useState('');
    const getCurrentTimeInUnixTime = useGetCurrentTimeInUnixTime();

    const { pasteSticker } = useBoardContentAtom();
    const handlePasteScrapButtonClick = () => {
        pasteSticker({
            memoId: getCurrentTimeInUnixTime,
            memoText: textAreaValue,
            createdDate: getCurrentTimeInUnixTime,
        });
        logEvent('paste_sticker');
        closeModal();
    }
    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    }

    const validation = () => {
        if (!useIsLessThanLengthLimitation(textAreaValue, MAX_MEMO_LENGTH)) {
            return `최대 ${MAX_MEMO_LENGTH}글자까지만 입력 가능합니다.`;
        }

        if (!useIsEntered(textAreaValue)) {
            return ' ';
        }

        if (useIsBlank(textAreaValue)) {
            return '공백만 입력되었습니다.';
        }

        return 'success';
    }
    const isValidationSuccess = () => validation() === 'success';

    return (
        <Box
            sx={{
                p: '0 16px',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <FormControl>
                <OutlinedInput
                    placeholder="추가할 메모를 입력하세요."
                    onChange={(e) => handleSetValue(e)}
                    sx={{
                        width: '100%',
                        fontWeight: '500',
                        fontHeight: '150%',
                        p: '14px 21px',
                        '& fieldset': {
                            color: theme.color.Gray_060,
                        },
                    }}
                    multiline
                    rows={5}
                />
                <FormHelperText>
                    <Typography
                        variant="h6"
                        color={isValidationSuccess() ? theme.color.Gray_060 : '#f44336'}
                        sx={{
                            fontWeight: '500',
                            lineHeight: '150%',
                            mt: '6px',
                        }}
                    >
                        {isValidationSuccess() ? `${textAreaValue.length} / ${MAX_MEMO_LENGTH}자` : validation()}
                    </Typography>
                </FormHelperText>
            </FormControl>
            <Button
                variant='contained'
                sx={{
                    backgroundColor: theme.color.Gray_050,
                    borderRadius: '4px',
                    boxShadow: 'none',
                    width: 'fit-content',
                    alignSelf: 'flex-end',
                    '&:hover': {
                        backgroundColor: theme.color.Blue_080,
                        boxShadow: 'none',
                    }
                }}
                onClick={handlePasteScrapButtonClick}
                disabled={!isValidationSuccess()}
            >
                등록
            </Button>
        </Box>
    );
}

export default StickerPasteModalElement;
