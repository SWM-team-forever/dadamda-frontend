import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { Card } from '@mui/material';
import { useCallback, useState } from 'react';
import AdvancedCarousel from '../molcules/AdvancedCarousel';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import { GET_PRODUCT_SCRAP_URL } from '../../secret';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { uesGetProductScrap } from '../../api/scrap';
import _ from 'lodash';

function ExistProductScrapContainer() {
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const token = localStorage.getItem('token');
    const [isSelected, setIsSelected] = useState(false);
    const size = 30;
    const [pages, setPages] = useState(0);
    const [, setError] = useState<string | null>(null);

    const onSuccess = useCallback((data: any) => {
        setCategoryItemList(data);
        if (!isSelected) {
            setSelectedContent(data[0]);
            setIsSelected(true);
        }
    }, []);

    const onError = useCallback((err: Error) => {
        setError(err.message);
    }, []);

    const { isLoading, error, data } = useQuery(
        ['scraps'],
        () => token && uesGetProductScrap({ pages: pages, size: size, token: token }),
        {
            onSuccess,
            onError,
            select(data) {
                return data?.data?.content;
            },
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return <CircularProgress
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} />;
    }

    const varient = 'desktopProductItem';

    // if (JSON.stringify(selectedContent) === JSON.stringify({})) {
    //     setSelectedContent(categoryItemList[0]);
    // }
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
                        <FocusedProductItemDetails varient={varient} />
                    </ColumnContainer>
                </Card>
            </Desktop >

            {/* Mobile */}
            <Mobile>
                <CategoryItemListProvider.MobileProductList />
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

function FocusedProductItemDetails({ varient }: { varient: string }) {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                padding: '30px',
                boxSizing: 'border-box',
                width: '100%',
                background: 'white',
            }}>
            <CategoryItemSelectedProvider.Header varient={varient} />
            <CategoryItemSelectedProvider.Price varient={varient} />
            <CategoryItemSelectedProvider.Description varient={varient} />
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
