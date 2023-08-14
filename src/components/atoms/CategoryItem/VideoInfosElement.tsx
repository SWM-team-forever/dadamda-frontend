import { Typography } from "@mui/material";
import { getTimeDiff } from "../../../hooks/useCalculateDateDiff";
import ColumnContainer from "../ColumnContainer";
import RowContainer from "../RowContainer";
import theme from "../../../assets/styles/theme";

const mobileVideoStyle = {
    alignItems: 'center',
    flex: '1',
    fontHeight: '160%',
    color: theme.color.text_gray_color,
};

const desktopVideoItemStyle = {
    alignItems: 'center',
    flex: '1',
    fontHeight: '160%',
    color: theme.color.text_gray_color,
};

const siteNameStyles = {
    mobileVideo: mobileVideoStyle,
    desktopVideoItem: desktopVideoItemStyle,
}

export function VideoInfosElement({ publishedDate, watchedCnt, playTime, varient }) {
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

    const videoInfoElementStyles = siteNameStyles[varient as keyof typeof siteNameStyles];

    return (
        <RowContainer style={{ justifyContent: 'space-between' }}>
            {videoMenus.map(menu => {
                return (
                    <>
                        {menu.content &&
                            <ColumnContainer style={videoInfoElementStyles}>
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
