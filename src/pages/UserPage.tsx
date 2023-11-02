import styled from 'styled-components';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

import theme from '@/assets/styles/theme';
import defaultUserImage from '@/assets/images/Avatar.png';
import { useLogout } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';
import { useGetUserInformation } from '@/api/user';
import { useConvertUnixTimeToDateFormat, useGetDaysDiff } from '@/hooks/useCalculateDateDiff';

import { DarkWaveVector, EditPencilSquareIcon, LightWaveVector } from '@/components/atoms/Icon';
import UserInfoTable from '@/components/molcules/UserPage/UserInfoTable';

function UserPage() {
    const { userInformation, isGetUserInformationLoading } = useGetUserInformation();

    const { openModal } = useModal();
    const handleLogout = useLogout();

    if (isGetUserInformationLoading) {
        return <div>로딩중</div>;
    }

    const { profileUrl, name, provider, nickname, createdAt } = userInformation;

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
                    <ProfileContainer>
                        {profileUrl
                            ? <ProfileImage src={profileUrl} />
                            : <ProfileImage src={defaultUserImage} />
                        }
                    </ProfileContainer>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '20px',
                            width: '100%',
                            p: {
                                xs: '120px 16px 20px 16px',
                                sm: '120px 0px 20px 80px',
                            },
                            boxSizing: 'border-box',
                        }}
                    >
                        <UserInfoTable userInformation={userInformation} />
                    </Box>
                    <Button
                        variant='outlined'
                        startIcon={<EditPencilSquareIcon width='17' height='17' fill={theme.color.Blue_080} />}
                        sx={{
                            mb: '32px',
                        }}
                    >
                        프로필 수정하기
                    </Button>
                </UserInfoWrapper>
                <Box
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
                        sx={{
                            color: 'white',
                            backgroundColor: theme.color.Gray_070,
                            '&:hover': {
                                backgroundColor: theme.color.Gray_080,
                            }
                        }}
                    >
                        로그아웃
                    </Button>
                    <Button
                        onClick={() => openModal('userDelete')}
                        sx={{
                            color: theme.color.Gray_080,
                            backgroundColor: 'transparent',
                            border: `1px solid ${theme.color.Gray_060}`,
                        }}
                    >
                        탈퇴하기
                    </Button>
                </Box>
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

const ProfileContainer = styled.div`
    position: absolute;
    top: -25%;
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
