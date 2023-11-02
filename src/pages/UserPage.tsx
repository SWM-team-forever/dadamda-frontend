import styled from 'styled-components';
import { Box, Button, OutlinedInput, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useState } from 'react';

import theme from '@/assets/styles/theme';
import defaultUserImage from '@/assets/images/Avatar.png';
import { useLogout } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';
import { useGetUserInformation } from '@/api/user';

import { DarkWaveVector, EditPencilSquareIcon, LightWaveVector } from '@/components/atoms/Icon';
import UserInfoTable from '@/components/molcules/UserPage/UserInfoTable';

export const useIsUserPageEditMode = (mode: string) => {
    return mode === 'edit';
}

export const useIsUserPageViewMode = (mode: string) => {
    return mode === 'view';
}

function UserPage() {
    const { userInformation, isGetUserInformationLoading } = useGetUserInformation();

    const { openModal } = useModal();
    const handleLogout = useLogout();
    const [mode, setMode] = useState('view');

    if (isGetUserInformationLoading) {
        return <div>로딩중</div>;
    }

    const { profileUrl, name, provider, nickname, createdAt } = userInformation;

    const changeModeIntoEdit = () => {
        setMode('edit');
    }

    const changeModeIntoView = () => {
        setMode('view');
    }

    const grayFullfilledButtonStyle = {
        color: 'white',
        backgroundColor: theme.color.Gray_070,
        '&:hover': {
            backgroundColor: theme.color.Gray_080,
        }
    }

    const grayOutlinedButtonStyle = {
        color: theme.color.Gray_080,
        backgroundColor: 'transparent',
        border: `1px solid ${theme.color.Gray_060}`,
    }

    function UserImage({ mode }) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '-25%',
                }}
            >
                <Box
                    sx={{

                    }}
                >
                    {profileUrl
                        ? <ProfileImage src={profileUrl} />
                        : <ProfileImage src={defaultUserImage} />
                    }
                    {mode === 'edit' &&
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'center',
                                gap: '8px',
                                mt: '24px',
                            }}
                        >
                            <Button sx={grayOutlinedButtonStyle}>이미지 변경</Button>
                            <Button sx={grayFullfilledButtonStyle}>이미지 삭제</Button>
                        </Box>
                    }
                </Box>
            </Box>
        )
    }

    return (
        <Wrapper>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '-20px',
                    overflow: 'hidden',
                }}
            >
                <LightWaveVector />
            </Box>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '-20px',
                    overflow: 'hidden',
                }}
            >
                <DarkWaveVector />
            </Box>
            <Box
                sx={{
                    maxWidth: '580px',
                    width: '100%',
                }}
            >
                <UserInfoWrapper>
                    <UserImage mode={mode} />
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px',
                            width: '100%',
                            p: {
                                xs: '120px 16px 20px 16px',
                                sm: '120px 0px 20px 0',
                            },
                            boxSizing: 'border-box',
                            justifyContent: 'center',
                        }}
                    >
                        <UserInfoTable userInformation={userInformation} mode={mode} />
                        {useIsUserPageEditMode(mode) &&
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
                                >닉네임: </Typography>
                                <OutlinedInput
                                    value={nickname}
                                    sx={{
                                        width: {
                                            xs: '217px',
                                            sm: '260px',
                                        },
                                        'input': {
                                            p: '8px 0 8px 12px',
                                            backgroundColor: '#FFF',
                                            borderRadius: '8px',
                                            border: `1px solid ${theme.color.Gray_040}`
                                        }
                                    }} />
                            </Box>
                        }
                    </Box>
                    {
                        useIsUserPageViewMode(mode)
                        && <Button
                            variant='outlined'
                            startIcon={<EditPencilSquareIcon width='17' height='17' fill={theme.color.Blue_080} />}
                            sx={{
                                mb: '32px',
                            }}
                            onClick={changeModeIntoEdit}
                        >
                            프로필 수정하기
                        </Button>
                    }
                    {
                        useIsUserPageEditMode(mode)
                        && <Button
                            variant='contained'
                            sx={{
                                m: '60px 0 32px 0',
                                width: '180px',
                            }}
                            onClick={changeModeIntoView}
                        >
                            프로필 변경하기
                        </Button>
                    }
                </UserInfoWrapper>
                {
                    useIsUserPageViewMode(mode)
                    && <Box
                        sx={{
                            display: 'flex',
                            gap: '8px',
                            mt: '20px',
                            width: '100%',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            onClick={handleLogout}
                            sx={grayFullfilledButtonStyle}
                        >
                            로그아웃
                        </Button>
                        <Button
                            onClick={() => openModal('userDelete')}
                            sx={grayOutlinedButtonStyle}
                        >
                            탈퇴하기
                        </Button>
                    </Box>
                }
            </Box >
        </Wrapper >
    );
}

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px;
    box-sizing: border-box;
`

const ProfileImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100%;
`

const UserInfoWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    background-color: ${theme.color.Gray_020};
    border-radius: 8px;
    position: relative;
`

export default UserPage;
