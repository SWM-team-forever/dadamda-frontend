import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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

export function useGetCurrentTimeInUnixTime() {
	return dayjs().unix();
}

export function useConvertUnixTimeToDateFormat(unixTime: number): string {
	return dayjs.unix(unixTime).format("YYYY년 MM월 DD일");
}

export function useGetDaysDiff(unixTime: number): number {
	return dayjs().diff(dayjs.unix(unixTime), "day");
}

function convertUnixTimeToSpecificDateFormat(unixTIme: number) {
	return dayjs.unix(unixTIme).format("YYYY-MM-DD HH:mm:ss");
}

function getCurrentTime() {
	return dayjs().subtract(1, "month").unix();
}

function getMonthLaterTime() {
	return dayjs().unix();
}

export function useGetCurrentTimeAndMonthLaterInSpecificDateFormat() {
	return {
		currentTime: convertUnixTimeToSpecificDateFormat(
			getCurrentTime()
		),
		monthLaterTime: convertUnixTimeToSpecificDateFormat(
			getMonthLaterTime()
		),
	};
}
