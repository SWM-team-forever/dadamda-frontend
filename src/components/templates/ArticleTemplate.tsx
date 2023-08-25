import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';
import ExistVideoScrapContainer from '../organisms/ExistVideoScrapContainer';
import CategoryItemSelectedProvider from '../../context/CategoryItemContext';
import CategoryItemListProvider from '../../context/CategoryListContext';
import ExistArticleScrapContainer from '../organisms/ExistArticleScrapContainer';

interface VideoTemplateProps {
    videos: contentProps['content'][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function ArticleTemplate({ videos, count }: VideoTemplateProps) {
    return (
        <>
            <ScrapListHeader type='아티클' count={count} />
            {videos.length ?
                <CategoryItemListProvider>
                    <CategoryItemSelectedProvider>
                        <ExistArticleScrapContainer />
                    </CategoryItemSelectedProvider>
                </CategoryItemListProvider>
                : <EmptyScrapContainer />
            }
        </>
    )
}

export default ArticleTemplate;