import { useState, useEffect } from "react";

export function useDeviceType() {
  const [device, setDevice] = useState({
    isMobile: false,
    isTab: false,
  });

  useEffect(() => {
    // Tailwind's default breakpoints
    const mobileQuery = window.matchMedia("(max-width: 639px)"); // < sm
    const tabQuery = window.matchMedia("(min-width: 640px) and (max-width: 1023px)"); // sm ≤ width < lg

    const updateDeviceType = () => {
      setDevice({
        isMobile: mobileQuery.matches,
        isTab: tabQuery.matches,
      });
    };

    // Initial check
    updateDeviceType();

    // Listen for breakpoint changes
    mobileQuery.addEventListener("change", updateDeviceType);
    tabQuery.addEventListener("change", updateDeviceType);

    return () => {
      mobileQuery.removeEventListener("change", updateDeviceType);
      tabQuery.removeEventListener("change", updateDeviceType);
    };
  }, []);

  return device; // { isMobile: boolean, isTab: boolean }
}
