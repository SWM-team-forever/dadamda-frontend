import { useDeleteUser } from '@/api/user';
import theme from '@/assets/styles/theme';
import { useGetToken } from '@/hooks/useAccount';
import { useModal } from '@/hooks/useModal';
import { Box, Button } from '@mui/material';
import styled from 'styled-components';

function UserDeleteModalElement() {
    const { closeModal } = useModal();
    const { mutate } = useDeleteUser();
    const token = useGetToken();

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
                        onClick={
                            () => {
                                token && mutate(token);
                                closeModal();
                            }
                        }
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
