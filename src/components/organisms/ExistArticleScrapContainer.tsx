import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';
import RowContainer from '../atoms/RowContainer';

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
                    marginBottom: '20px',
                    paddingBottom: '20px',
                    overflow: 'auto',
                }}>
                    <FocusedArticleItemDetails varient={'desktopItemVideo'} />
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
                    <CategoryItemSelectedProvider.Video />
                    <div style={{
                        height: 'calc(100% - 100vw * 9 / 16 - 116px)',
                        width: '100%',
                        overflow: 'auto',
                        position: 'fixed',
                        top: 'calc(100vw * 9 / 16 + 116px)',
                        background: 'white',
                    }}>
                        <FocusedArticleItemDetails varient={'mobileVideo'} />
                        <CategoryItemSelectedProvider.MemoArea />
                        <CategoryItemListProvider.MobileVideoList />
                    </div>
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
            <CategoryItemSelectedProvider.Thumbnail varient={varient} />
            <RowContainer>
                <CategoryItemSelectedProvider.AuthorImage varient={varient} />
                <ColumnContainer>
                    <CategoryItemSelectedProvider.Author varient={varient} />
                    <CategoryItemSelectedProvider.BlogName varient={varient} />
                </ColumnContainer>
                <CategoryItemSelectedProvider.PublishedDate varient={varient} />
            </RowContainer>
            <CategoryItemSelectedProvider.Description varient={varient} />
            <CategoryItemSelectedProvider.MemoArea varient={varient} />
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