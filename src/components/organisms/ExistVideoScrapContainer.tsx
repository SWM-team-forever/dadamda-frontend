import styled from 'styled-components';
import RowContainer from '../atoms/RowContainer';
import ColumnContainer from '../atoms/ColumnContainer';
import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useSelectedCategoryItem } from './SelectedCategoryItem';
import { useCallback, useEffect, useState } from 'react';
import SelectedCategoryItemProvider from './SelectedCategoryItem';
import CategoryItemHorizontal from './CategoryItemHorizontal';
import CategoryItemVertical from './CategoryItemVertical';

interface ExistVideoScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistVideoScrapContainer({ contents }: ExistVideoScrapContainerProps) {
    const [, setSelectedContent] = useSelectedCategoryItem();
    const initiateSelectedContent = useCallback(() => {
        setSelectedContent(contents[0]);
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
                <VideoListWrapper>
                    <VideoList>
                        {contents.map((content) => {
                            return <CategoryItemHorizontal content={content} />
                        })}
                    </VideoList>
                    <MemoContainer />
                </VideoListWrapper>
                <Card sx={{
                    width: '100%',
                    height: 'fit-content',
                    marginBottom: '20px',
                }}>
                    <FocusedVideoItem />
                    <FocusedVideoItemDetails />
                </Card>
            </Desktop >

            {/* Mobile */}
            <Mobile>
                <ColumnContainer>
                    <SelectedCategoryItemProvider.Video />
                    <div style={{
                        height: 'calc(100% - 100vw * 9 / 16 - 116px)',
                        width: '100%',
                        overflow: 'auto',
                        position: 'fixed',
                        top: 'calc(100vw * 9 / 16 + 116px)',
                    }}>
                        <FocusedVideoItemDetails />
                        <MobileMemoContainer />
                        {contents.map(content => {
                            return <CategoryItemVertical content={content} />
                        })}
                    </div>
                </ColumnContainer>
            </Mobile >
        </>
    )
}

function FocusedVideoItem() {

    return (
        <SelectedCategoryItemProvider.Video />
    );
}

function FocusedVideoItemDetails() {
    return (
        <ColumnContainer
            style={{
                gap: '10px',
                padding: '30px',
                boxSizing: 'border-box',
                width: '100%',
                background: 'white',
            }}>
            <SelectedCategoryItemProvider.Header />
            <SelectedCategoryItemProvider.Channel />
            <SelectedCategoryItemProvider.Infos />
            <SelectedCategoryItemProvider.Description />
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
                height: 'calc(50% - 5px)',
                width: '100%',
                overflow: 'auto',
                boxSizing: 'border-box',
                justifyContent: 'flex-end',
            }}>
            <SelectedCategoryItemProvider.MemoArea />
        </ColumnContainer >
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
            <SelectedCategoryItemProvider.MemoArea />
        </ColumnContainer>
    )
}

const VideoList = styled.section`
    width: 100%;
    height: calc(50% - 5px);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: ${theme.style.shadow};
    border-radius: 4px;
    overflow: auto;
`

const VideoListWrapper = styled.div`
    width: 400px;
    padding: 0 10px;
    height: calc(100% - 74px);
    overflow: auto;
    box-sizing: border-box;
    position: sticky;
    display: flex;
    flex-direction: column;
    gap: 10px;
    top: 0;
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

export default ExistVideoScrapContainer
