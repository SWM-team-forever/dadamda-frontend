import { useSnapCarousel } from 'react-snap-carousel';
import CategoryItemHorizontal from '../organisms/CategoryItemHorizontal';
import ProductCategoryItemVertical from '../organisms/ProductCategoryItemVertical';

const AdvancedCarousel = ({ contents }) => {
    const { scrollRef, pages, activePageIndex, next, prev, goTo } =
        useSnapCarousel();
    return (
        <>
            <ul
                ref={scrollRef}
                style={{
                    display: 'flex',
                    overflow: 'auto',
                    scrollSnapType: 'x mandatory'
                }}
            >
                {contents.map((content) => (
                    <ProductCategoryItemVertical content={content} />
                ))}
            </ul>
            <div>
                {activePageIndex + 1} / {pages.length}
            </div>
            <button onClick={() => prev()}>Prev</button>
            <button onClick={() => next()}>Next</button>
            <ol style={{ display: 'flex' }}>
                {pages.map((_, i) => (
                    <li key={i}>
                        <button
                            style={i === activePageIndex ? { opacity: 0.5 } : {}}
                            onClick={() => goTo(i)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}
            </ol>
        </>
    );
};

export default AdvancedCarousel;
