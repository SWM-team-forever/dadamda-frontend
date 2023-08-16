import { useState } from "react";
import { Box, CardActionArea, CardContent, TextareaAutosize } from "@mui/material";
import styled from "styled-components";

import ColumnContainer from "../../atoms/ColumnContainer";
import RowContainer from "../../atoms/RowContainer";
import { IconButtonListElement } from "../../atoms/CategoryItem/IconButtonListElement";
import { ThumbnailElement } from "../../atoms/CategoryItem/ThumbnailElement";
import { TitleElement } from "../../atoms/CategoryItem/TitleElement";
import { PriceElement } from "../../atoms/CategoryItem/PriceElement";

import theme from "../../../assets/styles/theme";
import { contentProps } from "../../../types/ContentType";
import { MemoAreaElement } from "../../atoms/CategoryItem/MemoAreaElement";
import { SiteNameElement } from "../../atoms/CategoryItem/SiteNameElement";
import { AuthorElement } from "../../atoms/CategoryItem/AuthorElement";
import { AuthorImageElement } from "../../atoms/CategoryItem/AuthorImageElement";
import { BlogNameElement } from "../../atoms/CategoryItem/BlogNameElement";
import { PublishedDateElement } from "../../atoms/CategoryItem/PublishedDateElement";
import { DescriptionElement } from "../../atoms/CategoryItem/DescrptionElement";

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
