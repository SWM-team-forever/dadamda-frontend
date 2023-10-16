import { useDeleteUser } from '@/api/user';
import theme from '@/assets/styles/theme';
import { useGetToken } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';
import { logEvent } from '@amplitude/analytics-browser';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';

function UserDeleteModalElement() {
    const { closeModal } = useModal();
    const token = useGetToken();
    const { mutate } = useDeleteUser();
    const handleDeleteUserButtonClick = () => {
        token && mutate(token);
        logEvent('delete_user');
        closeModal();
    }

    const userDeleteModalButtonStyle = {
        backgroundColor: theme.color.Gray_050,
        borderRadius: '4px',
        boxShadow: 'none',
        width: 'fit-content',
        alignSelf: 'flex-end',
        '&:hover': {
            backgroundColor: theme.color.Blue_080,
            boxShadow: 'none',
        }
    }

    return (
        <Box>

            <DefaultTypography>한 번 탈퇴한 사용자는 다시 복구되지 않습니다.<br />정말 탈퇴하시겠습니까?</DefaultTypography>
            <ModalFooter>
                <ButtonContainer>
                    <Button
                        variant='contained'
                        sx={userDeleteModalButtonStyle}
                        onClick={handleDeleteUserButtonClick}
                    >
                        탈퇴하기
                    </Button>
                    <Button
                        variant='contained'
                        sx={userDeleteModalButtonStyle}
                        onClick={closeModal}
                    >
                        취소하기
                    </Button>
                </ButtonContainer>
            </ModalFooter>
        </Box>
    )
}

const DefaultTypography = styled.span`
    font-size: 12px;
    color: ${theme.color.text_gray_color};
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

export default UserDeleteModalElement;
