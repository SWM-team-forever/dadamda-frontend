import { useState } from "react";
import { Box, CardActionArea, CardContent } from "@mui/material";

import theme from "@/assets/styles/theme";
import { contentProps } from "@/types/ContentType";

import { AuthorElement } from "@/components/atoms/CategoryItem/AuthorElement";
import { AuthorImageElement } from "@/components/atoms/CategoryItem/AuthorImageElement";
import { BlogNameElement } from "@/components/atoms/CategoryItem/BlogNameElement";
import { DescriptionElement } from "@/components/atoms/CategoryItem/DescrptionElement";
import { IconButtonListElement } from "@/components/atoms/CategoryItem/IconButtonListElement";
import { MemoAreaElement } from "@/components/atoms/CategoryItem/MemoAreaElement";
import { PublishedDateElement } from "@/components/atoms/CategoryItem/PublishedDateElement";
import { SiteNameElement } from "@/components/atoms/CategoryItem/SiteNameElement";
import { ThumbnailElement } from "@/components/atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "@/components/atoms/CategoryItem/TitleElement";
import ColumnContainer from "@/components/atoms/ColumnContainer";
import RowContainer from "@/components/atoms/RowContainer";

interface MobileProductListElementProps {
    content: contentProps['content'],
}

function MobileArticleListElement({ content }: MobileProductListElementProps) {
    const { thumbnailUrl, siteName, title, author, authorImageUrl, blogName, publishedDate, description } = content;
    const varient = 'mobileArticle';
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: 'white',
                boxShadow: theme.style.shadow,
                boxSizing: 'border-box',
                borderRadius: '4px',
            }}

        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '5px',
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                }}
            >
                <Box sx={{
                    width: '100%',
                }}>
                    <ThumbnailElement thumbnailUrl={thumbnailUrl} />
                </Box>
                <CardContent sx={{
                    width: '100%',
                    padding: '0 10px 10px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                    boxSizing: 'border-box',
                }}>
                    <RowContainer
                        style={{
                            gap: '5px',
                            width: '100%',
                            boxSizing: 'border-box',
                            justifyContent: 'space-between',
                            padding: '10px',
                        }}>
                        <ColumnContainer>
                            <SiteNameElement siteName={siteName} varient={varient} />
                            <TitleElement title={title} varient={varient} />
                        </ColumnContainer>
                        <IconButtonListElement content={content} />
                    </RowContainer>
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
            {open
                && <ColumnContainer>
                    <DescriptionElement description={description} varient={varient} />
                    <MemoAreaElement content={content} />
                </ColumnContainer>
            }
        </div>
    )
}

export default MobileArticleListElement;
