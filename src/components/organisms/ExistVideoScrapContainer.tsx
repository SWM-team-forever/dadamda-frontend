import styled from 'styled-components';
import RowContainer from '../atoms/RowContainer';
import ColumnContainer from '../atoms/ColumnContainer';
import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import { Card } from '@mui/material';
import { useSelectedCategoryItem } from './SelectedCategoryItem';
import { useCallback, useEffect } from 'react';
import SelectedCategoryItemProvider from './SelectedCategoryItem';
import CategoryItemHorizontal from './CategoryItemHorizontal';

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

    useEffect(() => {
        initiateSelectedContent();
    }, []);

    return (
        <RowContainer
            style={{
                padding: '0 20px',
                gap: '10px',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
            }}
        >
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
        </RowContainer >
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
            }}>
            <SelectedCategoryItemProvider.MemoArea />
        </ColumnContainer >
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
    `

export default ExistVideoScrapContainer
