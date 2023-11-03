import theme from "@/assets/styles/theme";
import BoardPublishModalElement from "@/components/atoms/Modal/BoardPublishModalElement";
import BoardShareModalElement from "@/components/atoms/Modal/BoardShareModalElement";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const typographyStyle = {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '150%',
    color: theme.color.Gray_090,
    whiteSpace: 'pre-line',
    textAlign: 'center',
}

function BoardShareAndPublishModalElement() {
    const [value, setValue] = useState(0);
    const handleChangeValue = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Tabs value={value} onChange={handleChangeValue}
                    sx={{
                        '& .MuiButtonBase-root': {
                            minHeight: 'auto',
                            color: theme.color.Gray_080,
                            fontWeight: '400',
                            fontSize: '14px',
                        },
                        '& .Mui-selected': {
                            color: theme.color.Blue_080,
                            fontWeight: '600'
                        },
                        minHeight: 'auto',
                    }}
                >
                    <Tab label="공유" sx={{
                        minWidth: 'auto',
                        m: '0 10px 8px 0',
                        p: '0',
                        '& .MuiTouchRipple-root': {
                            minHeight: '20px',
                        },
                    }} />
                    <Tab label="게시"
                        sx={{
                            minWidth: 'auto',
                            m: '0 0 8px 10px',
                            p: '0',
                        }}
                    />
                </Tabs>
            </Box>
            <BoardShareModalElement index={0} value={value} />
            <BoardPublishModalElement index={1} value={value} />
        </Box>
    )
}

export default BoardShareAndPublishModalElement;
