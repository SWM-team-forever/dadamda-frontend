import ExistOtherScrapContainer from '../organisms/ExistOtherScrapContainer';
import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';

interface VideoTemplateProps {
    videos: contentProps['content'][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function VideoTemplate({ videos, isFetching, setIsFetching, count }: VideoTemplateProps) {
    return (
        <>
            <ScrapListHeader type='비디오' count={count} />
            {videos.length ? <ExistOtherScrapContainer contents={videos} isFetching={isFetching} setIsFetching={setIsFetching} /> : <EmptyScrapContainer />}
        </>
    )
}

export default VideoTemplate;