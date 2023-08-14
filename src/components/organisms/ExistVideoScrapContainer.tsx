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

function ExistVideoScrapContainer({ contents }: ExistVideoScrapContainerProps) {
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
                    <div style={{
                        flex: '1',
                        overflow: 'auto',
                    }}>
                        <CategoryItemListProvider.DesktopVideoList />
                    </div>
                    <MemoContainer />
                </VideoListWrapper>
                <Card sx={{
                    width: '100%',
                    height: 'fit-content',
                    marginBottom: '20px',
                }}>
                    <CategoryItemSelectedProvider.Video />
                    <FocusedVideoItemDetails varient={'desktopVideoItem'} />
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
                    }}>
                        <FocusedVideoItemDetails varient={'mobileVideo'} />
                        <div style={{
                            padding: '20px',
                            boxSizing: 'border-box',
                            width: '100%',
                            background: 'white',
                            borderRadius: '4px',
                        }}>
                            <CategoryItemSelectedProvider.MemoArea />
                        </div>
                        <CategoryItemListProvider.MobileVideoList />
                    </div>
                </ColumnContainer>
            </Mobile >
        </>
    )
}

function FocusedVideoItemDetails({ varient }) {
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
                gap: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                padding: '10px',
                flex: '1',
                width: '100%',
                overflow: 'auto',
                boxSizing: 'border-box',
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

export default ExistVideoScrapContainer;
