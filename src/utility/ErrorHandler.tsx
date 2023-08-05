import { useNavigate } from 'react-router-dom';

import ErrorDialogModal from '../components/organisms/ErrorDialogModal';
import { useDefaultSnackbar } from '../hooks/useWarningSnackbar';
import { Dispatch, SetStateAction } from 'react';

interface ErrorHandleProps {
    error: string,
    setError: Dispatch<SetStateAction<Partial<string | null>>>
}

function ErrorHandler({ error, setError }: ErrorHandleProps) {
    const navigate = useNavigate();
    const errorMatching = {
        BR001: {
            message: {
                title: '오류 발생',
                content: '오류가 발생하였습니다. 다시 로그인해주세요.',
                action: '로그인하기',
            },
            onClick: () => {
                setError(null);
                localStorage.removeItem('token');
                navigate('/main');
            }
        },
        BR002: '이미 저장된 URL 입니다.',
        NF000: '존재하지 않습니다.',
        NF001: '존재하지 않는 스크랩입니다.',
        NF002: '존재하지 않는 회원입니다.',
        NF003: '존재하지 않는 메모입니다.',
        IS000: {
            message: {
                title: '오류 발생',
                content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
                action: '닫기',
            },
            onClick: () => {
                setError(null);
            }
        }
    };

    function isModal(error: string) {
        if (error === 'BR001' || error === 'IS000') {
            return true;
        }

        return false;
    }

    function ErrorToast(message: string) {
        useDefaultSnackbar(message, 'error');
        setError(null);
    }

    return (
        <>
            {isModal(error) ?
                <ErrorDialogModal
                    error={errorMatching[error as keyof typeof errorMatching]['message' as keyof object]}
                    onClick={errorMatching[error as keyof typeof errorMatching]['onClick' as keyof object]} />
                : ErrorToast(errorMatching[error as keyof typeof errorMatching] as string)
            }
        </>
    );
}


export default ErrorHandler;
