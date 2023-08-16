export function VideoElement({ embedUrl }: any) {

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
            }}>
            <iframe src={embedUrl}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }} />
        </div>
    );
}
