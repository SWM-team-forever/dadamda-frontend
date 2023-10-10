import styled from 'styled-components';
import { useState } from 'react';
import { decode } from 'html-entities';
import { Box, Typography } from '@mui/material';

import theme from '@/assets/styles/theme';
import { contentProps } from '@/types/ContentType';
import { useModal } from '@/hooks/useModal';
import { useTooltip } from '@/hooks/useTooltip';

import { DescriptionElement } from '@/components/atoms/CategoryItem/DescrptionElement';
import MemoCreateButton from '@/components/atoms/CategoryItem/MemoCreateButton';
import { SiteNameElement } from '@/components/atoms/CategoryItem/SiteNameElement';
import { ThumbnailElement } from '@/components/atoms/CategoryItem/ThumbnailElement';
import { TitleElement } from '@/components/atoms/CategoryItem/TitleElement';
import ColumnContainer from '@/components/atoms/ColumnContainer';
import RowContainer from '@/components/atoms/RowContainer';
import ChannelInfo from '@/components/molcules/CategoryItem/ScrapCard/ChannelInfo';
import Memo from '@/components/molcules/Memo';
import TooltipWrapper from '@/components/atoms/CategoryItem/TooltipWrapper';
import { useSelectedScrap } from '@/hooks/useSelectedScrap';
import { PriceElement } from '@/components/atoms/CategoryItem/PriceElement';

function ScrapCard({ content }: { content: contentProps['content'] }) {
    content = {
        ...content,
        title: decode('title' in content ? content.title : '', { level: 'html5' }),
        description: 'description' in content ? decode(content.description, { level: 'html5' }) : ''
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

    const { openModal, connectMemoWithScrapId } = useModal();
    const { closeTooltip } = useTooltip();
    const { setSelectedScrap } = useSelectedScrap();

    const menuItemContentList = [
        {
            title: '스크랩 수정',
            clickAction: (e: React.MouseEvent<HTMLElement>) => {
                setSelectedScrap(content);
                openModal('scrapEdit');
                closeTooltip(e);
            }
        },
        {
            title: '스크랩 삭제',
            clickAction: (e: React.MouseEvent<HTMLElement>) => {
                openModal('scrapDelete');
                closeTooltip(e);
            }
        }
    ]

    return (
        <CardContainer>
            <CardWrapper
                style={{ cursor: 'pointer' }}
            >
                <Box
                    component='div'
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: content.siteName ? 'space-between' : 'flex-end',
                    }}
                >
                    {content.siteName && <SiteNameElement siteName={content.siteName} varient={varient} />}
                    <TooltipWrapper menu={menuItemContentList} scrapId={content.scrapId} />
                </Box>
                <Box>
                    {content.title && <TitleElement title={content.title} varient={varient} />}
                    {content.price && <PriceElement price={content.price} variant={varient} />}
                </Box>
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
                    return <Memo
                        memoImageURL={memo.memoImageUrl}
                        memoText={memo.memoText}
                        createdDate={memo.createdDate}
                        scrapId={content.scrapId}
                        memoId={memo.memoId}
                    />
                })}
                <Box
                    component='div'
                    onClick={
                        (e) => {
                            e.stopPropagation();
                            connectMemoWithScrapId(content.scrapId);
                        }}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <MemoCreateButton
                        showMemoCreateModal={() => openModal('memoCreate')}
                    />
                </Box>
            </CardWrapper>
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
