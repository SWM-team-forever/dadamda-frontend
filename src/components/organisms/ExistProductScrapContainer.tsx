import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AdvancedCarousel from '../molcules/AdvancedCarousel';
import { useCategoryItemList } from '../../context/CategoryListContext';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import MobileProductListElement from '../molcules/CategoryItem/MobileProductListElement';
import { GET_PRODUCT_SCRAP_URL } from '../../secret';

interface ExistProductScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistProductScrapContainer() {
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const token = localStorage.getItem('token');
    const [types, setTypes] = useState<any[]>([]);
    const size = 10;
    const [isFetching, setIsFetching] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [pages, setPages] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const initiate = () => {
        setTypes([]);
        setIsFetching(true);
        setHasNextPage(true);
        setPages(0);
    }

    const fetchDatas = useCallback(async () => {
        const url = GET_PRODUCT_SCRAP_URL + `?page=${pages}&size=${size}`;
        token &&
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-AUTH-TOKEN": token,
                },
            }).then((response) => {
                // if (response.json().body) {
                //     throw new Error('UNDEFINED_ERROR');
                // }
                // console.log('body', response.json());
                return response.json().then(body => {
                    if (response.ok) {
                        return body;
                    } else {
                        throw new Error(body.resultCode);
                    }
                })
            })
                .then((data) => {
                    setTypes([...types, ...data.data.content]);
                    setPages(data.data.pageable.pageNumber + 1);
                    setHasNextPage(!data.data.last);
                })
                .catch(err => setError(err.message));
        setIsFetching(false);
    }, [pages, setCategoryItemList, token, types]);

    useEffect(() => {
        if (isFetching && hasNextPage) {
            fetchDatas();
        } else if (!hasNextPage) {
            setIsFetching(false);
        }
    }, [fetchDatas, hasNextPage, isFetching]);

    useEffect(() => {
        setCategoryItemList(types);
        // setSelectedContent(types[0]);
    });

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
                <ColumnContainer>
                    {types.map(content => {
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
