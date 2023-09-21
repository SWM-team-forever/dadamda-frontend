import EmptyScrapContainer from '@/components/organisms/EmptyScrapContainer';
import ColumnListTemplate from '@/components/templates/ColumnListTemplate';
import MasonryListTemplate from '@/components/templates/MasonryListTemplate';
import NotReadyTemplate from '@/components/templates/NotReadyTemplate';

function MatchTemplateWithTypeAndCount({ type, count }: { type: string, count: number }) {
    const providingTemplates = ['other', 'list', 'video', 'product', 'article'];
    const masonryTemplates = ['other', 'list'];

    if (!providingTemplates.includes(type)) {
        return <NotReadyTemplate />
    }

    if (count === 0) {
        return <EmptyScrapContainer />
    }

    return masonryTemplates.includes(type) ? <MasonryListTemplate type={type} /> : <ColumnListTemplate type={type} />
}

export default MatchTemplateWithTypeAndCount;
