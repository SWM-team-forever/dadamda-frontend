import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';
import ExistVideoScrapContainer from '../organisms/ExistVideoScrapContainer';
import CategoryItemSelectedProvider from '../../context/CategoryItemContext';
import CategoryItemListProvider from '../../context/CategoryListContext';

interface VideoTemplateProps {
    videos: contentProps['content'][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function VideoTemplate({ videos, count }: VideoTemplateProps) {
    return (
        <>
            <ScrapListHeader type='비디오' count={count} />
            {videos.length ?
                <CategoryItemListProvider>
                    <CategoryItemSelectedProvider>
                        <ExistVideoScrapContainer />
                    </CategoryItemSelectedProvider>
                </CategoryItemListProvider>
                : <EmptyScrapContainer />
            }
        </>
    )
}

export default VideoTemplate;