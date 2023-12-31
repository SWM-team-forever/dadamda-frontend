import { useState, ChangeEvent } from 'react';
import { Box, Button, FormControl, FormHelperText, OutlinedInput } from '@mui/material';

import { usePostCreateScrap } from '@/api/scrap';
import theme from '@/assets/styles/theme';
import { useModal } from '@/hooks/useModal';
import { SCRAP_LINK_MAX_LENGTH, useIsEntered, useIsLessThanLengthLimitation, useIsValidURL, useIsWhiteSpaceExist } from '@/hooks/useValidation';
import { logEvent } from '@/utility/amplitude';

import { LinkIcon } from '@/components/atoms/Icon';

function ScrapCreateModalElement() {
    const [textAreaValue, setTextAreaValue] = useState('');
    const { closeModal } = useModal();

    const handleSetValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        setTextAreaValue(e.target.value);
    };

    const { mutate } = usePostCreateScrap();
    const handleCreateScrapButtonClick = () => {
        mutate(textAreaValue);
        logEvent('create_scrap');
        closeModal();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.shiftKey) {
            return;
        } else if (e.key === 'Enter') {
            e.preventDefault();
            isValidationSuccess() && handleCreateScrapButtonClick();
        }
    }

    const validation = () => {
        if (!useIsLessThanLengthLimitation(textAreaValue, SCRAP_LINK_MAX_LENGTH)) {
            return `최대 ${SCRAP_LINK_MAX_LENGTH}글자까지만 입력 가능합니다.`;
        }

        if (!useIsEntered(textAreaValue)) {
            return ' ';
        }

        if (useIsWhiteSpaceExist(textAreaValue) || !useIsValidURL(textAreaValue)) {
            return '유효하지 않은 URL입니다.';
        }

        return 'success';
    }
    const isValidationSuccess = () => validation() === 'success';

    return (
        <FormControl
            sx={{
                display: 'flex',
                mb: '24px',
                width: '100%',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '9px',
                }}
            >
                <OutlinedInput
                    placeholder="추가할 스크랩 주소를 입력하세요."
                    onChange={(e) => handleSetValue(e)}
                    error={!isValidationSuccess()}
                    onKeyDown={handleKeyDown}
                    sx={{
                        width: '100%',
                        fontSize: '14px',
                        fontWeight: '500',
                        fontHeight: '150%',
                        borderRadius: '8px',
                        backgroundColor: '#FFF',
                        border: `1px solid ${theme.color.Gray_040}`,
                        height: 'fit-content',
                        p: '12px',
                        gap: '12px',
                        '& .MuiInputBase-root': {
                            p: '12px',
                            display: 'flex',
                            gap: '12px',
                            alignItems: 'center',
                        },
                        '& input': {
                            p: '0',
                        },
                        '& fieldset': {
                            border: 'none',
                            color: theme.color.Gray_060,
                        },
                    }}
                    startAdornment={
                        <LinkIcon width='24' height='24' fill={theme.color.Gray_090} color={theme.color.Gray_060} />
                    }
                    autoFocus
                />
                <Button
                    variant='contained'
                    sx={{
                        borderRadius: '8px',
                        boxShadow: 'none',
                        width: 'fit-content',
                        p: '8px 14px',
                        fontSize: '16px',
                        fontWeight: '600',
                        lineHeight: '150%',
                        '&:hover': {
                            backgroundColor: theme.color.Blue_080,
                            boxShadow: 'none',
                        }
                    }}
                    disabled={!isValidationSuccess()}
                    onClick={handleCreateScrapButtonClick}
                >
                    추가
                </Button>
            </Box>
            <FormHelperText
                sx={{
                    alignSelf: 'start',
                    color: '#f44336',
                }}
            >
                {!isValidationSuccess() ? validation() : ' '}
            </FormHelperText>
        </FormControl>
    );
}

export default ScrapCreateModalElement;
