import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import theme from '../../../assets/styles/theme';

const Section = () => {
    const sectionItems = [
        {
            id: 1,
            icon: <BookmarksIcon sx={{ fontSize: 100, color: theme.color.text_gray_color }} />,
            sentence:
                '링크를 저장하면 해당 콘텐츠에 적합한 형태로 정보를 보여줍니다.',
        },
        {
            id: 2,
            icon: <AutoAwesomeMosaicIcon sx={{ fontSize: 100, color: theme.color.text_gray_color }} />,
            sentence:
                '저장한 북마크는 사용자의 취향에 맞추어 보드에 정리할 수 있습니다.',
        },
        {
            id: 3,
            icon: <AutoAwesomeIcon sx={{ fontSize: 100, color: theme.color.text_gray_color }} />,
            sentence: '다른 사람의 보드를 구경하며 인사이트를 얻어보세요!',
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, minHeight: '400px' }}>
            <Grid container sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                minHeight: '500px',
            }}>
                {sectionItems.map((item) => (
                    <Grid
                        item
                        xs={12}
                        md={3.5}
                        minHeight={300}
                        key={item.id}
                        sx={{
                            backgroundColor: 'white',
                            textAlign: 'center',
                            padding: '50px',
                            width: '200px',
                            borderRadius: '10px',
                            margin: '10px !important',
                            color: theme.color.text_gray_color,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.15) 0px 8px 30px',
                        }}
                    >
                        {item.icon}
                        <Typography sx={{
                            wordBreak: 'keep-all',
                        }}>{item.sentence}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Section;
