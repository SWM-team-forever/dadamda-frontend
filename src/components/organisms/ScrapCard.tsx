import styled from 'styled-components';
import { useState } from 'react';
import { decode } from 'html-entities';

import ScrapEditModal from './ScrapEditModal';
import ScrapDeleteModal from './ScrapDeleteModal';
import MemoCreateModal from './MemoCreateModal';
import VideoScrapCard from '../molcules/VideoScrapCard';
import ErrorHandler from '../../utility/ErrorHandler';

import theme from '../../assets/styles/theme';
import { contentProps } from '../../types/ContentType';
import { DescriptionElement } from '@/components/atoms/CategoryItem/DescrptionElement';
import MemoCreateButton from '@/components/atoms/CategoryItem/MemoCreateButton';
import { SiteNameElement } from '@/components/atoms/CategoryItem/SiteNameElement';
import { ThumbnailElement } from '@/components/atoms/CategoryItem/ThumbnailElement';
import { TitleElement } from '@/components/atoms/CategoryItem/TitleElement';
import ColumnContainer from '@/components/atoms/ColumnContainer';
import RowContainer from '@/components/atoms/RowContainer';
import ChannelInfo from '@/components/molcules/CategoryItem/ScrapCard/ChannelInfo';
import Memo from '@/components/molcules/Memo';
import { Box, Typography } from '@mui/material';
import Tooltip from '@/components/atoms/CategoryItem/Tooltip';

function ScrapCard({ content }: contentProps) {
    const [isScrapEditModalVisible, setIsScrapEditModalVisible] = useState(false);
    const [isScrapDeleteModalVisible, setIsScrapDeleteModalVisible] = useState(false);
    const [isMemoCreateModalVisible, setIsMemoCreateModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function showScrapEditModal() {
        setIsScrapEditModalVisible(true);
    }

    function hideScrapEditModal() {
        setIsScrapEditModalVisible(false);
    }

    function showScrapDeleteModal() {
        setIsScrapDeleteModalVisible(true);
    }

    function hideScrapDeleteModal() {
        setIsScrapDeleteModalVisible(false);
    }

    function showMemoCreateModal() {
        setIsMemoCreateModalVisible(true);
    }

    function hideMemoCreateModal() {
        setIsMemoCreateModalVisible(false);
    }

    content = {
        ...content,
        title: decode(content.title, { level: 'html5' }),
        description: decode(content.description, { level: 'html5' })
    }

    const channelInfoElementArray = [
        content.channelImageUrl,
        content.channelName,
        content.publishedDate,
        content.author,
        content.blogName,
        content.authorImageUrl
    ];
    const varient = 'scrapCard';

    return (
        <CardContainer>
            <CardWrapper
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    window.open(`${content.pageUrl}`);
                }}>
                <Box
                    component='div'
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: content.siteName ? 'space-between' : 'flex-end',
                    }}
                >
                    {content.siteName && <SiteNameElement siteName={content.siteName} varient={varient} />}
                    <Tooltip />
                </Box>
                {content.title && <TitleElement title={content.title} varient={varient} />}
                {
                    channelInfoElementArray.some((element) => !!element) && < ChannelInfo content={content} />
                }
                <ThumbnailElement thumbnailUrl={content.thumbnailUrl} />
                <RowContainer>
                    {content.watchedCnt &&
                        <ColumnContainer
                            style={{
                                gap: '4px',
                                flex: '1',
                            }}
                        >
                            <Typography
                                variant='h6'
                                color={theme.color.Gray_070}
                            >
                                조회수
                            </Typography>
                            <Typography
                                variant='h3'
                                color={theme.color.Gray_090}
                                sx={{
                                    fontWeight: '600',
                                    lineHeight: '150%',
                                }}
                            >
                                {content.watchedCnt}
                            </Typography>
                        </ColumnContainer>
                    }
                    {content.playTime &&
                        <ColumnContainer
                            style={{
                                gap: '4px',
                                flex: '1',
                            }}
                        >
                            <Typography
                                variant='h6'
                                color={theme.color.Gray_070}
                            >
                                영상 길이
                            </Typography>
                            <Typography
                                variant='h3'
                                color={theme.color.Gray_090}
                                sx={{
                                    fontWeight: '600',
                                    lineHeight: '150%',
                                }}
                            >
                                {content.playTime}
                            </Typography>
                        </ColumnContainer>
                    }
                </RowContainer>
                {content.description && <DescriptionElement description={content.description} varient={varient} />}
                {content.memoList?.map(memo => {
                    return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
                })}
                <Box
                    component='div'
                    onClick={
                        (e) => {
                            e.stopPropagation();
                        }}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <MemoCreateButton showMemoCreateModal={showMemoCreateModal} />
                </Box>
            </CardWrapper>
            {isScrapEditModalVisible && <ScrapEditModal hideScrapEditModal={hideScrapEditModal} content={content} setError={setError} />}
            {isScrapDeleteModalVisible && <ScrapDeleteModal hideScrapDeleteModal={hideScrapDeleteModal} scrapId={content.scrapId} />}
            {isMemoCreateModalVisible && <MemoCreateModal hideMemoCreateModal={hideMemoCreateModal} scrapId={content.scrapId} setError={setError} />}
            {error && <ErrorHandler error={error} setError={setError} />}
        </CardContainer>
    )
}

const CardContainer = styled.div`
    position: relative;
    word-break: break-all;
    border-radius: 8px;
    background: ${theme.color.Gray_020}
    box-shadow: 0px 2px 16px 0px rgba(19, 48, 74, 0.08);
`

const CardWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: ${theme.color.Gray_020};
    border-radius: 8px;
    box-shadow: 0px 2px 16px 0px rgba(19, 48, 74, 0.08);  
`

export default ScrapCard;