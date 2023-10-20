import { useEffect, useState } from "react";
import styled from "styled-components";

interface ThumbnailImageProps {
    thumbnailUrl: string,
}

function ThumbnailImage({ thumbnailUrl }: ThumbnailImageProps) {
    return (
        <CardImageWrapper>
            <CardImage src={thumbnailUrl} />
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
