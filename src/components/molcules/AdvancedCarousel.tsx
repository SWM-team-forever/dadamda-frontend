import { useSnapCarousel } from 'react-snap-carousel';

import { useCategoryItemList } from '@/context/CategoryListContext';
import theme from '@/assets/styles/theme';

import { LeftArrowIcon, RightArrowIcon } from '@/components/atoms/Icon';
import RowContainer from '@/components/atoms/RowContainer';
import DesktopProductListElement from '@/components/molcules/CategoryItem/CategoryScrapList/DesktopProductListElement';

const AdvancedCarousel = () => {
    const { scrollRef, next, prev } = useSnapCarousel();
    const [contents] = useCategoryItemList();

    return (
        <RowContainer
            style={{
                justifyContent: 'space-between',
            }}>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={() => prev()}>
                <LeftArrowIcon size={'30'} fill={theme.color.icon_color} />
            </div>
            <ul
                ref={scrollRef}
                style={{
                    display: 'flex',
                    overflow: 'auto',
                    scrollSnapType: 'x mandatory',
                    flex: '1',
                    padding: '0 10px',
                    boxSizing: 'border-box',
                }}
            >
                {contents.map((content) => (
                    <DesktopProductListElement content={content} />
                ))}
            </ul>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={() => next()}>
                <RightArrowIcon size={'30'} fill={theme.color.icon_color} />
            </div>
        </RowContainer>
    );
};

export default AdvancedCarousel;
