import { useState, useEffect } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl" | "default";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("default");

  useEffect(() => {
    // Values based on Tailwinds default breakpoints
    const breakpoints = {
      sm: window.matchMedia("(min-width: 640px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      "2xl": window.matchMedia("(min-width: 1536px)"),
    };

    const getBreakpoint = () => {
      if (breakpoints["2xl"].matches) return "2xl";
      if (breakpoints.xl.matches) return "xl";
      if (breakpoints.lg.matches) return "lg";
      if (breakpoints.md.matches) return "md";
      if (breakpoints.sm.matches) return "sm";
      return "default";
    };

    const updateBreakpoint = () => setBreakpoint(getBreakpoint());

    Object.values(breakpoints).forEach((breakpoint) => {
      breakpoint.addEventListener("change", updateBreakpoint);
    });

    updateBreakpoint();

    return () => {
      Object.values(breakpoints).forEach((breakpoint) => {
        breakpoint.removeEventListener("change", updateBreakpoint);
      });
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
