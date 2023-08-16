import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { contentProps } from '../types/ContentType';
import RowContainer from '../components/atoms/RowContainer';
import ColumnContainer from '../components/atoms/ColumnContainer';
import DesktopVideoListElement from '../components/molcules/CategoryItem/DesktopVideoListElement';
import MobileVideoListElement from '../components/molcules/CategoryItem/MobileVideoListElement';
import DesktopArticleElement from '../components/molcules/CategoryItem/DesktopArticleListElement';

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
            gap: '10px',
        }}>
            {categoryItemList.map(categoryItem =>
                <DesktopArticleElement content={categoryItem} />
            )}
        </ColumnContainer>
    )
}

CategoryItemListProvider.DesktopVideoList = DesktopVideoList;
CategoryItemListProvider.MobileVideoList = MobileVideoList;
CategoryItemListProvider.DesktopArticleList = DesktopArticleList;

export default CategoryItemListProvider;
