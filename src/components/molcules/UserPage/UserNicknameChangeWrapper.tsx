import { useEditUserNickname } from "@/api/user";
import theme from "@/assets/styles/theme";
import { MAX_USER_NICKNAME_LENGTH, useIsBlank, useIsLessThanLengthLimitation } from "@/hooks/useValidation";
import { useIsUserPageViewMode } from "@/pages/UserPage";
import { Box, Typography, OutlinedInput, Button, FormHelperText } from "@mui/material";
import { useState } from "react";

interface UserNicknameChangeWrapperProps {
    mode: string;
    nickname: string;
    changeModeIntoView: () => void;
}

function UserNicknameChangeWrapper({ mode, nickname, changeModeIntoView }: UserNicknameChangeWrapperProps) {
    const [nicknameInput, setNicknameInput] = useState(nickname);
    const handleNicknameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNicknameInput(event.target.value);
    }

    const { mutate, error } = useEditUserNickname();
    const isNicknameExist = (error: any) => error.message === 'BR003';
    const handleEditUserNickname = () => {
        mutate(nicknameInput);
        if (isNicknameExist(error)) {
            return;
        }
        changeModeIntoView()
    }

    const validateUserNickname = () => {
        if (useIsBlank(nicknameInput)) {
            return '닉네임을 입력해주세요.';
        }

        if (!useIsLessThanLengthLimitation(nicknameInput, MAX_USER_NICKNAME_LENGTH)) {
            return '닉네임은 10글자 이하로 입력해주세요.';
        }

        if (!isNicknameInputChanged()) {
            return ' ';
        }

        return;
    }

    const isNicknameInputChanged = () => nicknameInput !== nickname;

    if (useIsUserPageViewMode(mode)) {
        return;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '13px',
                        mt: '100px',
                        width: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: '600',
                            fontSize: '16px',
                            lineHeight: '150%',
                            color: theme.color.Gray_090,
                        }}
                    >
                        닉네임:
                    </Typography>
                    <OutlinedInput
                        value={nicknameInput}
                        sx={{
                            maxWidth: {
                                xs: '215px',
                                sm: '260px',
                            },
                            'input': {
                                p: '8px 0 8px 12px',
                                backgroundColor: '#FFF',
                                borderRadius: '8px',
                                border: `1px solid ${theme.color.Gray_040}`
                            }
                        }}
                        onChange={handleNicknameInputChange}
                    />
                </Box>
                <FormHelperText
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    {validateUserNickname()}
                </FormHelperText>
            </Box>
            <Button
                variant='contained'
                sx={{
                    m: '60px 0 32px 0',
                    width: '180px',
                }}
                onClick={handleEditUserNickname}
                disabled={!!validateUserNickname()}
            >
                프로필 변경하기
            </Button>
        </Box>
    );
}

export default UserNicknameChangeWrapper;
