import { useEffect, useRef } from "react";

function useInfiniteScroll(setIsFetching:(isFetching: boolean) => void, bottom) {
    const bottomObserver = useRef(null);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setIsFetching(true);
                }
            },
            observerOptions,
        );

        bottomObserver.current = observer;
    }, []);

    useEffect(() => {
        const observer = bottomObserver.current;
        if (bottom) {
            observer.observe(bottom);
        }

        return () => {
            if (bottom) {
                observer.unobserve(bottom);
            }
        };
    }, [bottom]);
}

export default useInfiniteScroll;