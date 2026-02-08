import { useEffect, useState } from "react";

/**
 * Hook to detect if the device is mobile
 * Uses a combination of screen size and touch capability
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < breakpoint;
      setIsMobile(isTouchDevice && isSmallScreen);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
