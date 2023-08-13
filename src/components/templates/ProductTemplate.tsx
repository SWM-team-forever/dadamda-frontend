import ScrapListHeader from '../molcules/ScrapListHeader';
import EmptyScrapContainer from '../organisms/EmptyScrapContainer';
import { contentProps } from '../../types/ContentType';
import ExistVideoScrapContainer from '../organisms/ExistVideoScrapContainer';
import SelectedCategoryItemProvider from '../organisms/SelectedCategoryItem';

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
                <SelectedCategoryItemProvider>
                    <ExistVideoScrapContainer contents={products} isFetching={isFetching} setIsFetching={setIsFetching} />
                </SelectedCategoryItemProvider>
                : <EmptyScrapContainer />
            }
        </>
    )
}

export default ProductTemplate;