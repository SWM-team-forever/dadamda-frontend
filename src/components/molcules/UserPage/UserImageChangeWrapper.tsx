import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import defaultUserImage from '@/assets/images/Avatar.png';
import useGetPreviewFile from "@/hooks/useGetPrevieFile";

import { grayOutlinedButtonStyle, grayFullfilledButtonStyle, useIsUserPageEditMode } from "@/pages/UserPage";
import { IMAGE_FILE_SIZE_LIMITATION, useIsFileSizeLessThanLimitation, useIsFileTypeImage } from "@/hooks/useValidation";
import theme from "@/assets/styles/theme";

function UserImageChangeWrapper({ mode, profileUrl }: { mode: string, profileUrl?: string }) {
    const [requestPrevieFile, file] = useGetPreviewFile();
    const [image, setImage] = useState(profileUrl);

    useEffect(() => {
        if (!file) {
            return;
        }

        const validateImageErrorMessage = getValidateImageErrorMessage(file);
        if (validateImageErrorMessage) {
            alert(validateImageErrorMessage);
            return;
        }

        previewUploadImage(file);
    }, [file]);

    const getValidateImageErrorMessage = (file: File) => {
        let error = '';
        if (!useIsFileSizeLessThanLimitation(file, IMAGE_FILE_SIZE_LIMITATION)) {
            error = '파일 용량이 너무 큽니다.';
        }

        if (!useIsFileTypeImage(file)) {
            error = '이미지 파일만 업로드 가능합니다.';
        }

        return error;
    }

    const previewUploadImage = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result as string);
        }
    }

    const handleRemoveImage = () => {
        setImage('');
    }

    function ProfileImage({ src }: { src: string }) {
        return <Box
            onClick={requestPrevieFile}
            sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover .MuiTypography-root': {
                    display: 'block',
                },
                '&:hover .profile-image': {
                    filter: 'brightness(0.5)',
                },
            }}
        >
            <img
                src={src}
                alt="프로필 이미지"
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '100%',
                }}
                className="profile-image"
            />
            <Typography
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'none',
                    zIndex: 1,
                    color: theme.color.Blue_050,
                }}
            >
                이미지 선택
            </Typography>
        </Box>
    }
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '-25%',
            }}
        >
            <Box>
                {image
                    ? <ProfileImage src={image} />
                    : <ProfileImage src={defaultUserImage} />
                }
                {useIsUserPageEditMode(mode) &&
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            gap: '8px',
                            mt: '24px',
                        }}
                    >
                        <Button
                            sx={grayOutlinedButtonStyle}
                        >
                            이미지 변경
                        </Button>
                        <Button
                            sx={grayFullfilledButtonStyle}
                            onClick={handleRemoveImage}
                        >
                            이미지 삭제
                        </Button>
                    </Box>
                }
            </Box>
        </Box>
    );
}

export default UserImageChangeWrapper;
