import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { contentProps } from '../types/ContentType';
import { VideoElement } from '../components/atoms/CategoryItem/VideoElement';
import { ThumbnailElement } from '../components/atoms/CategoryItem/ThumbnailElement';
import { IconButtonListElement } from '../components/atoms/CategoryItem/IconButtonListElement';
import { TitleElement } from '../components/atoms/CategoryItem/TitleElement';
import { ChannelElement } from '../components/atoms/CategoryItem/ChannelElement';
import { VideoInfosElement } from '../components/atoms/CategoryItem/VideoInfosElement';
import { DescriptionElement } from '../components/atoms/CategoryItem/DescrptionElement';
import { PriceElement } from '../components/atoms/CategoryItem/PriceElement';
import { MemoAreaElement } from '../components/atoms/CategoryItem/MemoAreaElement';
import RowContainer from '../components/atoms/RowContainer';
import { SiteNameElement } from '../components/atoms/CategoryItem/SitenameElement';
import ColumnContainer from '../components/atoms/ColumnContainer';

const CategoryItemSelectedContext = createContext({} as [contentProps['content'], Dispatch<SetStateAction<contentProps['content']>>]);

interface CategoryItemSelectedProviderProps {
    children?: React.ReactNode,
}

function CategoryItemSelectedProvider({ children }: CategoryItemSelectedProviderProps) {
    const selectedContentState = useState({} as contentProps['content']);

    return (
        <CategoryItemSelectedContext.Provider value={selectedContentState}>
            {children}
        </CategoryItemSelectedContext.Provider>
    )
}

export function useCategoryItemSelected() {
    const context = useContext(CategoryItemSelectedContext);
    if (context === undefined) {
        throw new Error('useSelectedCategoryItem must be used within SelectedCategoryItemContextProvider');
    }

    return context;
}

function Video() {
    const [selectedContent] = useCategoryItemSelected();
    const embedUrl = selectedContent.embedUrl;

    return (
        <VideoElement embedUrl={embedUrl} />
    );
}

function Thumbnail() {
    const [selectedContent] = useCategoryItemSelected();
    const thumbnailUrl = selectedContent.thumbnailUrl;

    return (
        <ThumbnailElement thumbnailUrl={thumbnailUrl} />
    );
}

function Header({ varient }) {
    const [selectedContent] = useCategoryItemSelected();
    const { siteName, title } = selectedContent;

    return (
        <>
            <RowContainer
                style={{
                    gap: '5px',
                    width: '100%',
                    boxSizing: 'border-box',
                    justifyContent: 'space-between',
                }}>
                <ColumnContainer>
                    <SiteNameElement siteName={siteName} varient={varient} />
                    <TitleElement title={title} varient={varient} />
                </ColumnContainer>
                <IconButtonListElement content={selectedContent} />
            </RowContainer>
        </>
    )
}

function Channel() {
    const [selectedContent] = useCategoryItemSelected();
    const { channelImageUrl, channelName } = selectedContent;

    return (
        <ChannelElement channelImageUrl={channelImageUrl} channelName={channelName} />
    )
}

function Infos() {
    const [selectedContent] = useCategoryItemSelected();
    const { publishedDate, watchedCnt, playTime } = selectedContent;

    return (
        <VideoInfosElement publishedDate={publishedDate} watchedCnt={watchedCnt} playTime={playTime} />
    )
}

function Description() {
    const [selectedContent] = useCategoryItemSelected();
    const { description } = selectedContent;

    return (
        <DescriptionElement description={description} />
    )
}

function Price({ varient }) {
    const [selectedContent] = useCategoryItemSelected();
    const { price } = selectedContent;

    return (
        <PriceElement price={price} varient={varient} />
    )
}

function MemoArea() {
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
    const { memoList, scrapId } = selectedContent;

    function updateMemoList(changedMemoList) {
        setSelectedContent({ ...selectedContent, memoList: changedMemoList });
    }

    return (
        <MemoAreaElement memoList={memoList} scrapId={scrapId} updateMemoList={updateMemoList} />
    )
}

CategoryItemSelectedProvider.Video = Video;
CategoryItemSelectedProvider.Header = Header;
CategoryItemSelectedProvider.Channel = Channel;
CategoryItemSelectedProvider.Infos = Infos;
CategoryItemSelectedProvider.Description = Description;
CategoryItemSelectedProvider.MemoArea = MemoArea;
CategoryItemSelectedProvider.Thumbnail = Thumbnail;
CategoryItemSelectedProvider.Price = Price;

export default CategoryItemSelectedProvider;
