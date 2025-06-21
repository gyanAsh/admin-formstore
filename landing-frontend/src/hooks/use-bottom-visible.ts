import { useEffect, useState, type RefObject } from "react";

export function useBottomVisible(ref: RefObject<HTMLElement | null>) {
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // const bounding = entry.boundingClientRect;
        // const isVisible =
        //   entry.isIntersecting && bounding.bottom <= window.innerHeight;
        // setIsBottomVisible(isVisible);
        setIsBottomVisible(entry.isIntersecting);
        if (entry.isIntersecting) observer.disconnect();
      },
      {
        threshold: 0.8,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return isBottomVisible;
}
