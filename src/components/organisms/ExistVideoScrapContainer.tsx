import styled from 'styled-components';
import ColumnContainer from '../atoms/ColumnContainer';
import { contentProps } from '../../types/ContentType';
import { Card, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import CategoryItemSelectedProvider, { useCategoryItemSelected } from '../../context/CategoryItemContext';
import CategoryItemListProvider, { useCategoryItemList } from '../../context/CategoryListContext';
import { useQuery } from '@tanstack/react-query';
import { uesGetProductScrap, useGetVideoScrap } from '../../api/scrap';

function ExistVideoScrapContainer() {
    const [, setSelectedContent] = useCategoryItemSelected();
    const [, setCategoryItemList] = useCategoryItemList();

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
        () => token && useGetVideoScrap({ pages: pages, size: size, token: token }),
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
                    paddingBottom: '20px',
                }}>
                    <CategoryItemSelectedProvider.Video />
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

export default ExistVideoScrapContainer;
