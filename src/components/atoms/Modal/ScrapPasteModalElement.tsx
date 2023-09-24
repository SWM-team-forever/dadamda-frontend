import SearchBar from "@/components/molcules/SearchBar";
import { TabContext, TabPanel } from "@mui/lab";
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

function ScrapPasteModalElement() {
    const [value, setValue] = useState('list');
    const handleTabValueChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    return (
        <Box>
            <TabContext value={value}>

                <SearchBar type="list" />
                <Tabs
                    variant="fullWidth"
                    sx={{
                        '& .MuiButtonBase-root': {
                            minWidth: 'auto',
                        }
                    }}
                    onChange={handleTabValueChange}
                >
                    <Tab label="전체" value='list' />
                    <Tab label="상품" value='product' />
                    <Tab label="아티클" value='article' />
                    <Tab label="비디오" value='video' />
                    <Tab label="장소" value='place' />
                </Tabs>
                <TabPanel value={value}>
                    {value}
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default ScrapPasteModalElement;
