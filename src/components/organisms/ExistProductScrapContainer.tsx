import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AdvancedCarousel from '../molcules/AdvancedCarousel';
import { useCategoryItemList } from '../../context/CategoryListContext';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import MobileProductListElement from '../molcules/CategoryItem/MobileProductListElement';

interface ExistProductScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistProductScrapContainer({ contents }: ExistProductScrapContainerProps) {
    const [, setSelectedContent] = useCategoryItemSelected();
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const initiateSelectedContent = useCallback(() => {
        setSelectedContent(contents[0]);
        setCategoryItemList(contents);
    }, [contents]);

    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        initiateSelectedContent();
    }, []);

    return (
        <>
            {/* Desktop */}

            <Desktop>
                <AdvancedCarousel />
                <Card sx={{
                    display: 'flex',
                }}>
                    <FocusedThumbnail />
                    <ColumnContainer style={{
                        flex: '1'
                    }}>
                        <FocusedProductItemDetails />
                    </ColumnContainer>
                </Card>
            </Desktop >

            {/* Mobile */}
            <Mobile>
                <ColumnContainer>
                    {contents.map(content => {
                        return <MobileProductListElement content={content} />
                    })}
                </ColumnContainer>
            </Mobile >
        </>
    )
}

function FocusedThumbnail() {

    return (
        <div style={{
            width: '30%',
            padding: '10px',
        }}>
            <CategoryItemSelectedProvider.Thumbnail />
        </div>
    );
}

function FocusedProductItemDetails() {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                padding: '30px',
                boxSizing: 'border-box',
                width: '100%',
                background: 'white',
            }}>
            <CategoryItemSelectedProvider.Header />
            <CategoryItemSelectedProvider.Price />
            <CategoryItemSelectedProvider.Description />
            <CategoryItemSelectedProvider.MemoArea />
        </ColumnContainer>
    )
}

function MobileMemoContainer() {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '10px',
                width: '100%',
                overflow: 'auto',
                boxSizing: 'border-box',
            }}>
            <CategoryItemSelectedProvider.MemoArea />
        </ColumnContainer>
    )
}

const Desktop = styled.div`
    padding: 20px;
    gap: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 600px) {
        display: none;
    }
`

const Mobile = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 600px) {
        display: none;
    }
`

export default ExistProductScrapContainer;
