import { Typography } from "@mui/material";
import { getTimeDiff } from "../../../hooks/useCalculateDateDiff";
import ColumnContainer from "../ColumnContainer";
import RowContainer from "../RowContainer";

export function VideoInfosElement({ publishedDate, watchedCnt, playTime }) {
    const videoMenus = [{
        title: '게시일',
        content: publishedDate,
    }, {
        title: '조회수',
        content: watchedCnt,
    }, {
        title: '영상 길이',
        content: playTime,
    },];

    return (
        <RowContainer style={{ justifyContent: 'space-between' }}>
            {videoMenus.map(menu => {
                return (
                    <>
                        {menu.content &&
                            <ColumnContainer style={{ alignItems: 'center', flex: '1' }}>
                                <Typography>{
                                    typeof (menu.content) === 'number' ? getTimeDiff(menu.content) : menu.content
                                }</Typography>
                                <Typography>{menu.title}</Typography>
                            </ColumnContainer>
                        }
                    </>
                )
            })}
        </RowContainer>
    )
}
