import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';
import RowContainer from '../atoms/RowContainer';
import MobileArticleListElement from '../molcules/CategoryItem/MobileArticleListElement';
import { useQuery } from '@tanstack/react-query';
import { uesGetProductScrap, useGetArticleScrap } from '../../api/scrap';

function ExistArticleScrapContainer() {
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const token = localStorage.getItem('token');
    const size = 30;
    const [pages, setPages] = useState(0);
    const [, setError] = useState<string | null>(null);

    const onSuccess = useCallback((data: any) => {
        setCategoryItemList(data);
        setSelectedContent(data[0]);
    }, []);

    const onError = useCallback((err: Error) => {
        setError(err.message);
    }, []);

    const { isLoading, error, data } = useQuery(
        ['scraps'],
        () => token && useGetArticleScrap({ pages: pages, size: size, token: token }),
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

    return (
        <>
            {/* Desktop */}

            <Desktop>
                <VideoListWrapper>
                    <CategoryItemListProvider.DesktopArticleList />
                </VideoListWrapper>
                <Card sx={{
                    flex: '1',
                    height: '100%',
                    overflow: 'auto',
                }}>
                    <FocusedArticleItemDetails varient={'desktopArticleItem'} />
                </Card>
                <iframe src={selectedContent.pageUrl}
                    style={{
                        flex: '1',
                        height: '100%',
                    }} />
            </Desktop >

            {/* Mobile */}
            <Mobile>
                <ColumnContainer>
                    {categoryItemList.map(content => {
                        return <MobileArticleListElement content={content} />
                    })}
                </ColumnContainer>
            </Mobile >
        </>
    )
}

function FocusedArticleItemDetails({ varient }: { varient: string }) {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                padding: '30px 30px 0 30px',
                boxSizing: 'border-box',
                width: '100%',
                background: 'white',
            }}>
            <CategoryItemSelectedProvider.Header varient={varient} />
            <CategoryItemSelectedProvider.Thumbnail />
            <RowContainer
                style={{
                    justifyContent: 'space-between',
                }}>
                <RowContainer
                    style={{
                        gap: '5px',
                    }}>
                    <CategoryItemSelectedProvider.AuthorImage />
                    <ColumnContainer>
                        <CategoryItemSelectedProvider.Author varient={varient} />
                        <CategoryItemSelectedProvider.BlogName varient={varient} />
                    </ColumnContainer>
                </RowContainer>
                <CategoryItemSelectedProvider.PublishedDate varient={varient} />
            </RowContainer>
            <CategoryItemSelectedProvider.Description varient={varient} />
            <CategoryItemSelectedProvider.MemoArea />
        </ColumnContainer>
    )
}

const VideoListWrapper = styled.div`
    width: 300px;
    padding: 0 10px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
`

const Desktop = styled.div`
    padding: 0 20px
    gap: 10px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
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

export default ExistArticleScrapContainer;
