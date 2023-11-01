import DefaultBoardThumbnail from "@/components/atoms/Board/DefaultBoardThumbnail";
import useGetPreviewFile from "@/hooks/useGetPrevieFile";
import { Box } from "@mui/material";
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

        previewUploadImage(file);
    }, [file]);

    const previewUploadImage = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result as string);
        }
    }

    return (
        <>
            {image
                ? <img
                    src={image}
                    style={{
                        width: '100%',
                        aspectRatio: '16/9',
                    }}
                />
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
