import { useEffect, useState } from "react";
import styled from "styled-components";

interface ThumbnailImageProps {
    thumbnailUrl: string,
}

function ThumbnailImage({ thumbnailUrl }: ThumbnailImageProps) {
    const [base64Image, setBase64Image] = useState<string | null>(null);

    useEffect(() => {
        async function loadImage() {
            try {
                const response = await fetch(thumbnailUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBase64Image(reader.result as string);
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        }

        loadImage();
    }, [thumbnailUrl]);

    return (
        <CardImageWrapper>
            {base64Image && <CardImage src={base64Image} crossOrigin="anonymous" />}
        </CardImageWrapper>
    );
}

const CardImageWrapper = styled.div`
   width: 100%;
   aspect-ratio: 16 / 9;
   overflow: hidden;
   position: relative;
   border-radius: 8px;
`

const CardImage = styled.img`
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default ThumbnailImage;
