import styled from 'styled-components';
import { decode } from 'html-entities';
import { Box, Typography, useMediaQuery } from '@mui/material';

import theme from '@/assets/styles/theme';
import { contentProps } from '@/types/ContentType';
import { useModal } from '@/hooks/useModal';
import { useTooltip } from '@/hooks/useTooltip';
import { useSelectedScrap } from '@/hooks/useSelectedScrap';

import { DescriptionElement } from '@/components/atoms/CategoryItem/DescrptionElement';
import { SiteNameElement } from '@/components/atoms/CategoryItem/SiteNameElement';
import { ThumbnailElement } from '@/components/atoms/CategoryItem/ThumbnailElement';
import { TitleElement } from '@/components/atoms/CategoryItem/TitleElement';
import ColumnContainer from '@/components/atoms/ColumnContainer';
import RowContainer from '@/components/atoms/RowContainer';
import ChannelInfo from '@/components/molcules/CategoryItem/ScrapCard/ChannelInfo';
import TooltipWrapper from '@/components/atoms/CategoryItem/TooltipWrapper';
import { PriceElement } from '@/components/atoms/CategoryItem/PriceElement';
import { useNavigate, useSearchParams } from 'react-router-dom';

function DesktopArticleListElement({ content }: contentProps) {
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

    const { openModal, connectMemoWithScrapId } = useModal();
    const { closeTooltip } = useTooltip();
    const { selectedScrap, setSelectedScrap } = useSelectedScrap();

    function isScrapSelected() {
        return searchParams.has('scrapId');
    }

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

    const [searchParams, setSearchParams] = useSearchParams();
    const scrapId = searchParams.get('scrapId');

    function isSelectedScrap() {
        return scrapId && content.scrapId === +(scrapId);
    }

    function changeSelectedScrap() {
        if (isScrapSelected()) {
            searchParams.delete('scrapId');
        }

        searchParams.append('scrapId', content.scrapId.toString());
        setSearchParams(searchParams);
    }

    const navigate = useNavigate();
    const isSMDevice = useMediaQuery('(max-width:600px)');
    const handleScrapClick = (e: React.MouseEvent<HTMLElement>) => {
        if (isSMDevice) {
            e.stopPropagation();
            window.open(content.pageUrl, '_blank');
        } else {
            e.stopPropagation();
            changeSelectedScrap();
            // navigate(`/scrap/${content.dtype}?scrapId=${content.scrapId}`);
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
                wordBreak: 'break-all',
                borderRadius: '8px',
                backgroundColor: theme.color.Gray_020,
                boxShadow: '0px 2px 16px 0px rgba(19, 48, 74, 0.08)',
                border: isSelectedScrap() ? `2px solid ${theme.color.Blue_070}` : 'none',
            }}
        >
            <CardWrapper
                style={{ cursor: 'pointer' }}
                onClick={handleScrapClick}
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
            </CardWrapper>
        </Box>
    )
}

const CardWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${theme.color.Gray_020};
    border-radius: 8px;
    box-shadow: 0px 2px 16px 0px rgba(19, 48, 74, 0.08);  
`

export default DesktopArticleListElement;
