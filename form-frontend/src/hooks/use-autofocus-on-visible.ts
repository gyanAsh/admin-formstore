import { useEffect, useRef } from "react";

/**
 * A hook that automatically focuses an element once it becomes visible in the viewport.
 * @param {number} [threshold=0.5] - The percentage of the element that must be visible to trigger the focus.
 * @returns {{ ref: React.RefObject<T> }} - An object containing the ref to attach to the element.
 */
export default function useAutoFocusOnVisible<T extends HTMLElement>(
  threshold = 0.5
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set up the IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the element is intersecting (visible)
        if (entry.isIntersecting) {
          // Use a small timeout to ensure the element is fully interactive before focusing.
          // This can help with elements that appear after a layout shift.
          setTimeout(() => {
            element.focus();
          }, 300); // Make sure to keep timeout >= side/page animation

          // ✨ Optimization: Disconnect the observer after focusing.
          // This prevents the code from running again and is more performant.
          observer.disconnect();
        }
      },
      { threshold }
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup: Disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, [threshold]); // The effect re-runs only if the threshold changes.

  // ✨ Optimization: Return only the ref.
  // The isInView state caused unnecessary re-renders.
  return { ref };
}
