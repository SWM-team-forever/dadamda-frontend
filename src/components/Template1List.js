// import VideoTemplate from './VideoTemplate';
import './Template1List.scss';
import ProductTemplate from './ProductTemplate';
// import ArticleTemplate from './ArticleTemplate';

const Template1List = ({ templates }) => {
    return (
        <div className="Template1List">
            {templates.map(template => (
                // <ArticleTemplate props={ template } key={ template.id }/>

                <ProductTemplate props={ template } key={ template.id }/>
                // <VideoTemplate props={ template } key={ template.id }/>
            ))}
        </div>
    );
};

export default Template1List;