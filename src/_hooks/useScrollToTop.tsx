import { useEffect, memo } from "react";
import { useLocation } from "react-router";

/** Хук с автоматическим скроллом в начало элемента при переходе на страничку */
export function useScrollToTop(target: HTMLDivElement | null) {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    target?.scrollTo({ top: 0, left: 0 });
  }, [pathname, target]);

  return <></>;
}

export default memo(useScrollToTop);
