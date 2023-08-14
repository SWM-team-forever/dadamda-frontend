import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';
import ExistVideoScrapContainer from '../organisms/ExistVideoScrapContainer';
import SelectedCategoryItemProvider from '../organisms/SelectedCategoryItem';
import ExistProductScrapContainer from '../organisms/ExistProductScrapContainer';
import CategoryItemSelectedProvider from '../../context/CategoryItemContext';
import CategoryItemListProvider from '../../context/CategoryListContext';

interface ProductTemplateProps {
    products: contentProps['content'][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
    count: number,
}

function ProductTemplate({ products, isFetching, setIsFetching, count }: ProductTemplateProps) {
    return (
        <>
            <ScrapListHeader type='상품' count={count} />
            {products.length ?
                <CategoryItemListProvider>
                    <CategoryItemSelectedProvider>
                        <ExistProductScrapContainer contents={products} isFetching={isFetching} setIsFetching={setIsFetching} />
                    </CategoryItemSelectedProvider>
                </CategoryItemListProvider>
                : <EmptyScrapContainer />
            }
        </>
    )
}

export default ProductTemplate;