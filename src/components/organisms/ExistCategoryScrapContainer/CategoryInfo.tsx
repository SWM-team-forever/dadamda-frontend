import theme from '@/assets/styles/theme';
import { Box } from '@mui/material';

import MemoList from '@/components/molcules/CategoryItem/Memo/MemoList';
import { MoveToPageIcon } from '@/components/atoms/Icon';
import { contentProps } from '@/types/ContentType';

function CategoryInfo({ data, scrapId }: { data: any, scrapId: number }) {
    function findScrapById(scrapId: number) {
        return data?.pages.flatMap((page: any) => page.data.content.filter((scrap: contentProps['content']) => scrap.scrapId === scrapId));
    }

    let selectedScrap = findScrapById(scrapId)[0];
    selectedScrap = typeof selectedScrap === 'undefined' ? data?.pages[0].data.content[0] : selectedScrap;

    return (
        <>
            <Box
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    flex: '1',
                    height: '100%',
                    borderRadius: '8px',
                    backgroundColor: theme.color.Gray_020,
                    boxShadow: '0px 2px 16px 0px rgba(19, 48, 74, 0.08)',
                }}
            >
                <Box
                    sx={{
                        p: '9px 16px 9px 0',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                    }}
                    onClick={() => window.open(selectedScrap.pageUrl)}
                >
                    <MoveToPageIcon width='16' height='16' fill={theme.color.Gray_070} />
                </Box>
                <iframe
                    sandbox="allow-scripts allow-forms allow-pointer-lock allow-same-origin"
                    src={selectedScrap.embedUrl ? selectedScrap.embedUrl : selectedScrap.pageUrl}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: '237px',
                    height: '100%',
                    overflow: 'auto',
                    display: { xs: 'none', md: 'block' },
                }}
            >
                <MemoList memoList={selectedScrap.memoList} scrapId={selectedScrap.scrapId} />
            </Box>
        </>
    );
}

export default CategoryInfo;
