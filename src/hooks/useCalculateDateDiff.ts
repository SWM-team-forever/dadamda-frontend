import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; 

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("ko");


export function getTimeDiff(publishedDate: number): string {
    return dayjs.unix(publishedDate).fromNow();
}