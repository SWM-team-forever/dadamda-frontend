import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';
import ExistProductScrapContainer from '../organisms/ExistProductScrapContainer';
import CategoryItemSelectedProvider from '../../context/CategoryItemContext';
import CategoryItemListProvider from '../../context/CategoryListContext';

interface ProductTemplateProps {
    products: contentProps['content'][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function ProductTemplate({ count }: ProductTemplateProps) {
    return (
        <>
            <ScrapListHeader type='상품' count={count} />
            {count > 0 ?
                <CategoryItemListProvider>
                    <CategoryItemSelectedProvider>
                        <ExistProductScrapContainer />
                    </CategoryItemSelectedProvider>
                </CategoryItemListProvider>
                : <EmptyScrapContainer />
            }
        </>
    )
}

export default ProductTemplate;