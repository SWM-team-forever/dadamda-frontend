import './Template1.scss';
import TextContentList from './TextContentList';

const Template1 = ( {props} ) => {
    const {img, type, title, description, authorImage, authorName, textContents} = props;
    return (
        <div className='Template1'>
        <div className="Template1Main">
            <img className="templateMedia" src={ img } alt='templateMedia' />
            <div className='templateCommonArea'>
                <div className='templateType'>{ type }</div>
                <div className='templateTitle'>{ title }</div>
                <div className='templateDescription'>{ description }</div>
            </div>
            <div className='templateCustomArea'>
                <div className='author'>
                    <img className='authorImage' src={ authorImage } alt='authorImage' />
                    <p className='authorName'>{ authorName }</p>
                </div>
            </div>
        </div>
        <TextContentList textContents={ textContents }/>
        </div>
    ); 
};

export default Template1;