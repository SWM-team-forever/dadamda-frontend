import styled from 'styled-components';

import { contentProps } from '../../types/ContentType';
import Memo from './Memo';
import Button from '../atoms/DefaultButton';
import Chip from '../atoms/Chip';

import MoreIcon from '../../assets/icons/MoreVerticalIcon.png';
import theme from '../../assets/styles/theme';
import ThumbnailImage from '../atoms/ThumbnailImage';
import { SiteNameElement } from '../atoms/CategoryItem/SiteNameElement';
import { TitleElement } from '../atoms/CategoryItem/TitleElement';
import { ThumbnailElement } from '../atoms/CategoryItem/ThumbnailElement';
import { PriceElement } from '../atoms/CategoryItem/PriceElement';

interface ProductScrapCardProps {
    content: contentProps['content'],
    showMemoCreateModal: () => void,
    showTooltip: () => void,
}

function ProductScrapCard({ content, showMemoCreateModal, showTooltip }: ProductScrapCardProps) {

    const varient = 'scrapCard';

    return (
        <CardWrapper
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${content.pageUrl}`);
            }}>
            {content.siteName && <SiteNameElement siteName={content.siteName} varient={varient} />}
            {content.title && <TitleElement title={content.title} varient={varient} />}
            {content.thumbnailUrl && <ThumbnailElement thumbnailUrl={content.thumbnailUrl} />}
            {content.price && <PriceElement price={content.price} varient={varient} />}
            {content.description && <DefaultTypography>{content.description}</DefaultTypography>}
            {content.memoList?.map(memo => {
                return <Memo memoImageURL={memo.memoImageUrl} memoText={memo.memoText} />
            })}
            <ButtonContainer>
                <Button buttonStyle={'gray'} label={'메모 추가하기'} fullWidth isRound onClick={(e) => {
                    e.stopPropagation();
                    showMemoCreateModal();
                }} />
                <MoreIconContainer src={MoreIcon} onClick={(e) => {
                    e.stopPropagation();
                    showTooltip();
                }} />
            </ButtonContainer>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    border-radius: 4px;
`

const EmpasizedTypography = styled.span`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.color.text_gray_color};
    overflow: hidden;
    textOverflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    wordWrap: break-word;
`

const DefaultTypography = styled.span`
    font-size: 14px;
    color: ${theme.color.text_gray_color};
    overflow: hidden;
    textOverflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    wordWrap: break-word;
`

const ColoredTypography = styled(EmpasizedTypography)`
    color: ${theme.color.primary_opacity_color};
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
`

const MoreIconContainer = styled.img`
    width: 24px;
    height: 24px;
    cursor: pointer;
`

export default ProductScrapCard;
