import ThumbnailImage from "../ThumbnailImage";

export function ThumbnailElement({ thumbnailUrl }: any) {

    return (
        <>
            {thumbnailUrl && <ThumbnailImage thumbnailUrl={thumbnailUrl} />}
        </>
    );
}
