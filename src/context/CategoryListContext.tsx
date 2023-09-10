import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

import { contentProps } from '@/types/ContentType';

import ColumnContainer from '@/components/atoms/ColumnContainer';
import DesktopArticleListElement from '@/components/molcules/CategoryItem/CategoryScrapList/DesktopArticleListElement';
import DesktopVideoListElement from '@/components/molcules/CategoryItem/CategoryScrapList/DesktopVideoListElement';
import MobileArticleListElement from '@/components/molcules/CategoryItem/CategoryScrapList/MobileArticleListElement';
import MobileProductListElement from '@/components/molcules/CategoryItem/CategoryScrapList/MobileProductListElement';
import MobileVideoListElement from '@/components/molcules/CategoryItem/CategoryScrapList/MobileVideoListElement';
import ScrapCard from '@/components/organisms/ScrapCard';

const CategoryItemListContext = createContext({} as [contentProps['content'][], Dispatch<SetStateAction<contentProps['content'][]>>]);

interface CategoryItemListProviderProps {
    children?: React.ReactNode,
}

function CategoryItemListProvider({ children }: CategoryItemListProviderProps) {
    const categoryItemListState = useState([] as contentProps['content'][]);

    return (
        <CategoryItemListContext.Provider value={categoryItemListState}>
            {children}
        </CategoryItemListContext.Provider>
    )
}

export function useCategoryItemList() {
    const context = useContext(CategoryItemListContext);
    if (context === undefined) {
        throw new Error('useCategoryItemList must be used within CategoryItemListProvider');
    }

    return context;
}

function DesktopVideoList() {
    const [categoryItemList] = useCategoryItemList();

    return (
        <ColumnContainer>
            {categoryItemList.map(categoryItem =>
                <DesktopVideoListElement content={categoryItem} />
            )}
        </ColumnContainer>
    );
}

function MobileVideoList() {
    const [categoryItemList] = useCategoryItemList();

    return (
        <ColumnContainer>
            {categoryItemList.map(categoryItem =>
                <MobileVideoListElement content={categoryItem} />
            )}
        </ColumnContainer>
    )
}

function DesktopArticleList() {
    const [categoryItemList] = useCategoryItemList();

    return (
        <ColumnContainer style={{
            gap: '24px',
        }}>
            {categoryItemList.map(categoryItem =>
                <ScrapCard content={categoryItem} />
            )}
        </ColumnContainer>
    )
}

function MobileArticleList() {
    const [categoryItemList] = useCategoryItemList();

    return (
        <ColumnContainer>
            {categoryItemList.map(categoryItem =>
                <MobileArticleListElement content={categoryItem} />
            )}
        </ColumnContainer>
    )
}

function MobileProductList() {
    const [categoryItemList] = useCategoryItemList();

    return (
        <ColumnContainer>
            {categoryItemList.map(categoryItemList =>
                <MobileProductListElement content={categoryItemList} />
            )}
        </ColumnContainer>
    )
}

CategoryItemListProvider.DesktopVideoList = DesktopVideoList;
CategoryItemListProvider.MobileVideoList = MobileVideoList;
CategoryItemListProvider.DesktopArticleList = DesktopArticleList;
CategoryItemListProvider.MobileProductList = MobileProductList;

export default CategoryItemListProvider;
