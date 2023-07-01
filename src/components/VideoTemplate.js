import { useState } from 'react';
import './VideoTemplate.scss';

const VideoTemplate = ( {props} ) => {
    const {thumbnail, channelName, title, views, type} = props;
    const [hover, setHover] = useState(false);
    return (
        <div className='ArticleTemplate'>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="Template1Main">
                <div className='TemplateHeader'>
                    <div className={`${hover ? 'TemplateMediaOverlay hover' : 'TemplateMediaOverlay'}`}>
                        <img className={`${hover ? 'templateMedia hover' : 'templateMedia'}`} src={ thumbnail } alt='templateMedia' />
                    </div>
                <div className={`${hover ? 'templateCommonArea hover' : 'templateCommonArea'}`}>
                    <div className='templateType'>{ type }</div>
                    <div className='templateTitle'>{ title }</div>
                </div>
            </div>
                <div className='templateCustomArea'>
                    <div className={`${hover ? 'siteName hover' : 'siteName'}`}>
                        <div className={`${hover ? 'siteNameText hover' : 'siteNameText'}`}>{ channelName }</div>
                    </div>
                    <div className={`${hover ? 'priceText hover' : 'priceText'}`}> { views }</div>
                </div>
            </div>
        </div>
    ); 
};

export default VideoTemplate;