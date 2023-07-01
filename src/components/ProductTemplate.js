import { useState } from 'react';
import './ProductTemplate.scss';

const ProductTemplate = ( {props} ) => {
    const {url, image, title, id, type, price, site} = props;
    const [hover, setHover] = useState(false);
    return (
        <div className='ArticleTemplate'>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="Template1Main">
                <div className='TemplateHeader'>
                    <div className={`${hover ? 'TemplateMediaOverlay hover' : 'TemplateMediaOverlay'}`}>
                        <img className={`${hover ? 'templateMedia hover' : 'templateMedia'}`} src={ image } alt='templateMedia' />
                    </div>
                <div className={`${hover ? 'templateCommonArea hover' : 'templateCommonArea'}`}>
                    <div className='templateType'>{ type }</div>
                    <div className='templateTitle'>{ title }</div>
                </div>
            </div>
                <div className='templateCustomArea'>
                    <div className={`${hover ? 'siteName hover' : 'siteName'}`}>
                        <div className={`${hover ? 'siteNameText hover' : 'siteNameText'}`}>{ site }</div>
                    </div>
                    <div className={`${hover ? 'priceText hover' : 'priceText'}`}> { price }</div>
                </div>
            </div>
        </div>
    ); 
};

export default ProductTemplate;