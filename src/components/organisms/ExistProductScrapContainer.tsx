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
import AdvancedCarousel from '../molcules/AdvancedCarousel';

interface ExistProductScrapContainerProps {
    contents: contentProps["content"][],
    isFetching: boolean,
    setIsFetching: (isFetching: boolean) => void,
}

function ExistProductScrapContainer({ contents }: ExistProductScrapContainerProps) {
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
                <AdvancedCarousel contents={contents} />
                <Card sx={{
                    display: 'flex',
                }}>
                    <FocusedThumbnail />
                    <ColumnContainer style={{
                        flex: '1'
                    }}>
                        <FocusedProductItemDetails />
                    </ColumnContainer>
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
                        <FocusedProductItemDetails />
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

function FocusedThumbnail() {

    return (
        <div style={{
            width: '30%',
            padding: '10px',
        }}>
            <SelectedCategoryItemProvider.Thumbnail />
        </div>
    );
}

function FocusedProductItemDetails() {
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
            <SelectedCategoryItemProvider.Price />
            <SelectedCategoryItemProvider.Description />
            <SelectedCategoryItemProvider.MemoArea />
        </ColumnContainer>
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
