import ThumbnailImage from "../ThumbnailImage";

export function ThumbnailElement({ thumbnailUrl }) {

    return (
        <>
            {thumbnailUrl && <ThumbnailImage thumbnailUrl={thumbnailUrl} />}
        </>
    );
}
