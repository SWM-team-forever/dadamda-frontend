import { useSnapCarousel } from 'react-snap-carousel';
import CategoryItemHorizontal from '../organisms/CategoryItemHorizontal';
import ProductCategoryItemVertical from '../organisms/ProductCategoryItemVertical';
import RowContainer from '../atoms/RowContainer';
import { LeftArrowIcon, RightArrowIcon } from '../atoms/Icon';
import theme from '../../assets/styles/theme';

const AdvancedCarousel = ({ contents }) => {
    const { scrollRef, pages, activePageIndex, next, prev, goTo } =
        useSnapCarousel();
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
                    <ProductCategoryItemVertical content={content} />
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
