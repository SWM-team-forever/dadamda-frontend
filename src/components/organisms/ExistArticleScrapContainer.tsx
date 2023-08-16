import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';
import RowContainer from '../atoms/RowContainer';
import MobileArticleListElement from '../molcules/CategoryItem/MobileArticleListElement';
import MobileProductListElement from '../molcules/CategoryItem/MobileProductListElement';

interface ExistVideoScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistArticleScrapContainer({ contents }: ExistVideoScrapContainerProps) {
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
    const [categoryItemList, setCategoryItemList] = useCategoryItemList();

    const initiateSelectedContent = useCallback(() => {
        setSelectedContent(contents[0]);
        setCategoryItemList(contents);
    }, [contents, setCategoryItemList, setSelectedContent]);

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
                        return <MobileProductListElement content={content} />
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

function MemoContainer() {
    return (
        <ColumnContainer
            style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                flex: '1',
                width: '100%',
                overflow: 'auto',
            }}>
            <CategoryItemSelectedProvider.MemoArea />
        </ColumnContainer >
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