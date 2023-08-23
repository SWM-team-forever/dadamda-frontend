import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AdvancedCarousel from '../molcules/AdvancedCarousel';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import MobileProductListElement from '../molcules/CategoryItem/MobileProductListElement';
import { GET_PRODUCT_SCRAP_URL } from '../../secret';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';

interface ExistProductScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistProductScrapContainer() {
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const token = localStorage.getItem('token');
    const size = 10;
    const [pages, setPages] = useState(0);
    const [, setError] = useState<string | null>(null);

    const fetchDatas = async () => {
        const url = GET_PRODUCT_SCRAP_URL + `?page=${pages}&size=${size}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TOKEN": token,
            },
        }).then((response) => {
            return response.json().then(body => {
                if (response.ok) {
                    return body;
                } else {
                    throw new Error(body.resultCode);
                }
            })
        });

        return response;
    };

    const onSuccess = useCallback((data) => {
        console.log('data', data);
        setCategoryItemList(data);
        setSelectedContent(data[0]);
    }, []);

    const onError = useCallback((err) => {
        setError(err.message);
    }, []);

    const { isLoading, error, data } = useQuery(
        ['productScrap'],
        () => fetchDatas(),
        {
            onSuccess,
            onError,
            select(data) {
                return data.data.content;
            },
            refetchOnWindowFocus: false,
        }
    );

    if (isLoading) {
        return <CircularProgress sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        }} />;
    }

    const varient = 'desktopProductItem';

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
