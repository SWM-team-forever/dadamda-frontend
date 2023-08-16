import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { contentProps } from '../types/ContentType';
import { VideoElement } from '../components/atoms/CategoryItem/VideoElement';
import { ThumbnailElement } from '../components/atoms/CategoryItem/ThumbnailElement';
import { IconButtonListElement } from '../components/atoms/CategoryItem/IconButtonListElement';
import { TitleElement } from '../components/atoms/CategoryItem/TitleElement';
import { ChannelProfileElement } from '../components/atoms/CategoryItem/ChannelProfileElement';
import { VideoInfosElement } from '../components/atoms/CategoryItem/VideoInfosElement';
import { DescriptionElement } from '../components/atoms/CategoryItem/DescrptionElement';
import { PriceElement } from '../components/atoms/CategoryItem/PriceElement';
import { MemoAreaElement } from '../components/atoms/CategoryItem/MemoAreaElement';
import RowContainer from '../components/atoms/RowContainer';
import ColumnContainer from '../components/atoms/ColumnContainer';
import { SiteNameElement } from '../components/atoms/CategoryItem/SiteNameElement';
import { AuthorImageElement } from '../components/atoms/CategoryItem/AuthorImageElement';
import { AuthorElement } from '../components/atoms/CategoryItem/AuthorElement';
import { BlogNameElement } from '../components/atoms/CategoryItem/BlogNameElement';

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

function Header({ varient }: { varient: string }) {
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

function ChannelProfile({ varient }: { varient: string }) {
    const [selectedContent] = useCategoryItemSelected();
    const { channelImageUrl, channelName } = selectedContent;

    return (
        <ChannelProfileElement channelImageUrl={channelImageUrl} channelName={channelName} varient={varient} />
    )
}

function Infos({ varient }: { varient: string }) {
    const [selectedContent] = useCategoryItemSelected();
    const { publishedDate, watchedCnt, playTime } = selectedContent;

    return (
        <VideoInfosElement publishedDate={publishedDate} watchedCnt={watchedCnt} playTime={playTime} varient={varient} />
    )
}

function Description({ varient }: { varient: string }) {
    const [selectedContent] = useCategoryItemSelected();
    const { description } = selectedContent;

    return (
        <DescriptionElement description={description} varient={varient} />
    )
}

function Price({ varient }: { varient: string }) {
    const [selectedContent] = useCategoryItemSelected();
    const { price } = selectedContent;

    return (
        <PriceElement price={price} varient={varient} />
    )
}

function MemoArea() {
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    return (
        <MemoAreaElement content={selectedContent} />
    )
}

function AuthorImage() {
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
    const { authorImageUrl } = selectedContent;

    return (
        <AuthorImageElement authorImage={authorImageUrl} />
    )
}

function Author() {
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
    const { author } = selectedContent;

    return (
        <AuthorElement author={author} />
    )
}

function BlogName() {
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();
    const { blogName } = selectedContent;

    return (
        <BlogNameElement blogName={blogName} />
    )
}

CategoryItemSelectedProvider.Video = Video;
CategoryItemSelectedProvider.Header = Header;
CategoryItemSelectedProvider.ChannelProfile = ChannelProfile;
CategoryItemSelectedProvider.Infos = Infos;
CategoryItemSelectedProvider.Description = Description;
CategoryItemSelectedProvider.MemoArea = MemoArea;
CategoryItemSelectedProvider.Thumbnail = Thumbnail;
CategoryItemSelectedProvider.Price = Price;
CategoryItemSelectedProvider.Author = Author;
CategoryItemSelectedProvider.AuthorImage = AuthorImage;
CategoryItemSelectedProvider.BlogName = BlogName;

export default CategoryItemSelectedProvider;
