import { JSX, useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Утилита для автоматического скролла в начало при переходе на страничку */
function ScrollToTop({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return <>{children}</>;
}

export default ScrollToTop;
