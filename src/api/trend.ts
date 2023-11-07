import { useGetCurrentTimeAndMonthLaterInSpecificDateFormat } from "@/hooks/useCalculateDateDiff";
import { useTrendingAtom } from "@/hooks/useTrendingAtom";
import { GET_TRENDING_LIST_URL } from "@/secret";
import { useInfiniteQuery } from "@tanstack/react-query";

const getTrendingList = async ({
	pages,
	size,
	tag,
}: {
	pages: number;
	size: number;
	tag?: string;
}) => {
	const { currentTime, monthLaterTime } =
		useGetCurrentTimeAndMonthLaterInSpecificDateFormat();

	const urlWithoutTag =
		GET_TRENDING_LIST_URL +
		`?page=${pages}&size=${size}&startDate=${currentTime}&endDate=${monthLaterTime}`;
	const requestUrl = tag ? urlWithoutTag + `&tag=${tag}` : urlWithoutTag;

	const response = await fetch(requestUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => {
		return response.json().then((body) => {
			if (response.ok) {
				return body;
			} else {
				throw new Error(body.resultCode);
			}
		});
	});

	return response;
};

export const useGetTrendingList = () => {
	const { trending } = useTrendingAtom();
	const isListTag = (tag: string) => tag === "LIST";

	const { data, fetchNextPage, hasNextPage, isLoading } =
		useInfiniteQuery(
			["trendingList", trending.tag],
			({ pageParam = 0 }) => {
				return isListTag(trending.tag)
					? getTrendingList({
							pages: pageParam,
							size: 3,
					  })
					: getTrendingList({
							pages: pageParam,
							size: 3,
							tag: trending.tag,
					  });
			},
			{
				getNextPageParam: (lastPage) => {
					return lastPage.data.last
						? undefined
						: lastPage.data.number + 1;
				},
				retry: false,
			}
		);

	const [
		trendingList,
		fetchNextTrendingList,
		hasNextTrendingList,
		isTrendingListLoading,
	] = [data, fetchNextPage, hasNextPage, isLoading];
	return {
		trendingList,
		fetchNextTrendingList,
		hasNextTrendingList,
		isTrendingListLoading,
	};
};
