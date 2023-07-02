import { useState } from 'react';
import './ArticleTemplate.scss';
import TextContentList from './TextContentList';
import { RiMore2Fill } from 'react-icons/ri';

const ArticleTemplate = ( {props} ) => {
    const {img, type, title, description, authorImage, authorName, textContents, siteName} = props;
    const [hover, setHover] = useState(false);
    return (
        <div className='ArticleTemplate'>
            <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="Template1Main">
                <div className='TemplateHeader'>
                    <div className={`${hover ? 'TemplateMediaOverlay hover' : 'TemplateMediaOverlay'}`}>
                        <img className={`${hover ? 'templateMedia hover' : 'templateMedia'}`} src={ img } alt='templateMedia' />
                    </div>
                <div className={`${hover ? 'templateCommonArea hover' : 'templateCommonArea'}`}>
                    <div className='templateType'>{ type }</div>
                    <div className='templateTitle'>{ title }</div>
                    <div className='templateDescription'>{ description }</div>
                </div>
            </div>
                <div className='templateCustomArea'>
                    <div className='author'>
                        <img className='authorImage' src={ authorImage } alt='authorImage' />
                        <p className='authorName'>{ authorName }</p>
                    </div>
                <RiMore2Fill color='#384fbf' cursor='default' position='absolute' top='0' right='0'/>
                </div>
            </div>
            <TextContentList textContents={ textContents }/>
        </div>
    ); 
};

export default ArticleTemplate;