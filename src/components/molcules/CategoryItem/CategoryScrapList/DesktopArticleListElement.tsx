import { CardActionArea, Box, CardContent } from "@mui/material";

import theme from "@/assets/styles/theme";
import { useCategoryItemSelected } from "@/context/CategoryItemContext";
import { contentProps } from "@/types/ContentType";

import { AuthorElement } from "@/components/atoms/CategoryItem/AuthorElement";
import { AuthorImageElement } from "@/components/atoms/CategoryItem/AuthorImageElement";
import { BlogNameElement } from "@/components/atoms/CategoryItem/BlogNameElement";
import { PublishedDateElement } from "@/components/atoms/CategoryItem/PublishedDateElement";
import { SiteNameElement } from "@/components/atoms/CategoryItem/SiteNameElement";
import { ThumbnailElement } from "@/components/atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "@/components/atoms/CategoryItem/TitleElement";
import ColumnContainer from "@/components/atoms/ColumnContainer";
import RowContainer from "@/components/atoms/RowContainer";

interface DesktopArticleElementProps {
    content: contentProps['content'],
}

function DesktopArticleListElement({ content }: DesktopArticleElementProps) {
    const { thumbnailUrl, blogName, title, author, authorImageUrl, siteName, publishedDate } = content;
    const [selectedContent, setSelectedContent] = useCategoryItemSelected();

    const varient = 'desktopArticleList';

    return (
        <div
            style={{
                width: '100%',
                boxShadow: theme.style.shadow,
                borderRadius: '4px',
                display: 'block',
                backgroundColor: `${selectedContent.scrapId === content.scrapId ? theme.color.background_color : 'white'}`,
            }}
            onClick={() => setSelectedContent(content)}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '5px',
                    padding: '10px',
                }}
            >
                <Box sx={{
                    width: '100%',
                }}>
                    <ThumbnailElement thumbnailUrl={thumbnailUrl} />
                </Box>
                <CardContent sx={{
                    width: '100%',
                    padding: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}>
                    <SiteNameElement siteName={siteName} varient={varient} />
                    <TitleElement title={title} varient={varient} />
                    <RowContainer
                        style={{
                            justifyContent: 'space-between',
                        }}>
                        <RowContainer
                            style={{
                                gap: '5px',
                            }}>
                            <AuthorImageElement authorImage={authorImageUrl} />
                            <ColumnContainer>
                                <AuthorElement author={author} varient={varient} />
                                <BlogNameElement blogName={blogName} varient={varient} />
                            </ColumnContainer>
                        </RowContainer>
                        <PublishedDateElement publishedDate={publishedDate} varient={varient} />
                    </RowContainer>
                </CardContent>
            </CardActionArea>
        </div>
    )
}

export default DesktopArticleListElement;
