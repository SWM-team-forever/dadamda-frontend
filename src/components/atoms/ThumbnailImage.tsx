import { useEffect, useState } from "react";
import styled from "styled-components";

interface ThumbnailImageProps {
    thumbnailUrl: string,
}

function ThumbnailImage({ thumbnailUrl }: ThumbnailImageProps) {
    return (
        <CardImageWrapper>
            <CardImage
                src={thumbnailUrl}
                onError={e => {
                    e.currentTarget.src = '/default_image.png';
                }}
            />
        </CardImageWrapper>
    );
}

const CardImageWrapper = styled.div`
   width: 100%;
   aspect-ratio: 16 / 9;
   overflow: hidden;
   border-radius: 8px;
`

const CardImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
`

export default ThumbnailImage;
