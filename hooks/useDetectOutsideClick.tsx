import { useState, useEffect, RefObject } from "react";

/**
 * https://gist.github.com/jmblog/fb05eaba27a8993749145adc898f9bcb
 */
export const useDetectOutsideClick = (
  el: RefObject<HTMLElement>,
  initialState: boolean
) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target as Node)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive, el]);

  return [isActive, setIsActive] as const;
};
