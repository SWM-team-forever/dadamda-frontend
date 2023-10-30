import metaImage from '@/assets/images/dadamda_img.png';
import { Helmet } from 'react-helmet-async';

interface MetaTagProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    siteName?: string;
    type?: string;
}

function getCurrentUrl() {
    return window.location.href;
}

function MetaTag({ title, description, image, url, siteName, type }: MetaTagProps) {
    const defaultMetaValue = {
        title: title || '세상의 모든 URL, 다담다',
        description: description || '내용에 따라 자동으로 북마크를 구성하는 신개념 컨텐츠 맞춤 스크랩 서비스, 다담다',
        image: image || metaImage,
        url: url || getCurrentUrl(),
        siteName: siteName || '다담다',
        type: type || 'website',
    }

    return (
        <Helmet>
            <title>{defaultMetaValue.title}</title>
            <meta name="description" content={defaultMetaValue.description} />
            <meta property="og:title" content={defaultMetaValue.title} />
            <meta property="og:description" content={defaultMetaValue.description} />
            <meta property="og:image" content={defaultMetaValue.image} />
            <meta property="og:url" content={defaultMetaValue.url} />
            <meta property="og:site_name" content={defaultMetaValue.siteName} />
            <meta property="og:type" content={defaultMetaValue.type} />
            <meta property="twitter:title" content={defaultMetaValue.title} />
            <meta property="twitter:description" content={defaultMetaValue.description} />
            <meta property="twitter:image" content={defaultMetaValue.image} />
            <meta property="twitter:url" content={defaultMetaValue.url} />
        </Helmet>
    );
}

export default MetaTag;
