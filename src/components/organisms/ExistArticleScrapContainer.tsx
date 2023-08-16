import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';

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
                    width: '100%',
                    height: 'fit-content',
                    marginBottom: '20px',
                    paddingBottom: '20px',
                }}>
                    <FocusedVideoItemDetails varient={'desktopItemVideo'} />
                </Card>
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
                        <FocusedVideoItemDetails varient={'mobileVideo'} />
                        <CategoryItemSelectedProvider.MemoArea />
                        <CategoryItemListProvider.MobileVideoList />
                    </div>
                </ColumnContainer>
            </Mobile >
        </>
    )
}

function FocusedVideoItemDetails({ varient }: { varient: string }) {
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
            <CategoryItemSelectedProvider.ChannelProfile varient={varient} />
            <CategoryItemSelectedProvider.Infos varient={varient} />
            <CategoryItemSelectedProvider.Description varient={varient} />
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
    width: 400px;
    padding: 0 10px;
    height: calc(100% - 74px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Desktop = styled.div`
    padding: 0 20px
    gap: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
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