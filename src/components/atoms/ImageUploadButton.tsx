import theme from "@/assets/styles/theme";
import DefaultBoardThumbnail from "@/components/atoms/Board/DefaultBoardThumbnail";
import useGetPreviewFile from "@/hooks/useGetPrevieFile";
import { IMAGE_FILE_SIZE_LIMITATION, useIsFileSizeLessThanLimitation, useIsFileTypeImage } from "@/hooks/useValidation";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

interface ImageUploadButtonProps {
    imageURL?: string;
}

function ImageUploadButton({ imageURL }: ImageUploadButtonProps) {
    const [requestPrevieFile, file] = useGetPreviewFile();
    const [image, setImage] = useState(imageURL);

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

    const textButtonStyle = {
        color: theme.color.Gray_080,
    }

    return (
        <>
            {image
                ? (
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: 'flex-end',
                            }}
                        >
                            <Button
                                onClick={requestPrevieFile}
                                style={textButtonStyle}
                            >
                                재업로드
                            </Button>
                            <Button
                                onClick={handleRemoveImage}
                                style={textButtonStyle}
                            >
                                제거
                            </Button>
                        </Box>
                        <img
                            src={image}
                            style={{
                                width: '100%',
                                aspectRatio: '16/9',
                            }}
                        />
                    </Box>
                )
                : <Box
                    onClick={requestPrevieFile}
                >
                    <DefaultBoardThumbnail />
                </Box>
            }
        </>
    );
}

export default ImageUploadButton;
