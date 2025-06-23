import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import {
  useRef,
  JSX,
  useState,
  useEffect,
  MouseEventHandler,
  useCallback,
} from "react";

interface ILeftScrollButtonProps {
  onClick: MouseEventHandler<HTMLSpanElement>;
}

const LeftScrollButton = ({ onClick }: ILeftScrollButtonProps) => {
  return (
    <LeftCircleOutlined
      className="absolute left-[-15px] top-[88px] text-3xl"
      onClick={onClick}
    />
  );
};

interface ILeftScrollButtonProps {
  onClick: MouseEventHandler<HTMLSpanElement>;
}

const RightScrollButton = ({ onClick }: ILeftScrollButtonProps) => {
  return (
    <RightCircleOutlined
      className="absolute right-[-15px] top-[88px] text-3xl"
      onClick={onClick}
    />
  );
};

interface IProps {
  children: JSX.Element;
  className?: string;
}

/**
 * Горзионтальный скролл-контейнер с кнопками вперед-назад
 */
const HorizontalScrollContainer = ({ children, className }: IProps) => {
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
  const [isVisibleLeftScroll, setIsVisibleLeftScroll] = useState(false);
  const [isVisibleRightScroll, setIsVisibleRightScroll] = useState(false);
  /* Размер скролла через кнопку -  2/3 от экрана */
  const sizeScroll = window.innerWidth / 1.5;

  /** Нужно ли показовать кнопки скролла */
  const isNeedScroll = useCallback((): boolean => {
    if (!(scrollDivRef.current instanceof HTMLDivElement)) {
      return false;
    }
    const scrollWidth = scrollDivRef.current?.scrollWidth;
    const widthContainer = scrollDivRef.current?.offsetWidth;
    return scrollWidth > widthContainer;
  }, [scrollDivRef.current]);

  /** Находимся ли в начале скролла */
  const isStartScroll = useCallback((): boolean => {
    if (!(scrollDivRef.current instanceof HTMLDivElement)) {
      return false;
    }
    return scrollDivRef.current?.scrollLeft === 0;
  }, [scrollDivRef.current]);

  /** Находимся ли в конце скролла */
  const isEndScroll = useCallback((): boolean => {
    if (!(scrollDivRef.current instanceof HTMLDivElement)) {
      return false;
    }
    const scrollWidth = scrollDivRef.current?.scrollWidth;
    const widthContainer = scrollDivRef.current?.offsetWidth;
    const scrollLeft = scrollDivRef.current?.scrollLeft;
    return scrollLeft + widthContainer === scrollWidth;
  }, [scrollDivRef.current]);

  /** Скролл в левую сторону */
  const scrollLeft = useCallback(() => {
    scrollDivRef.current!.scrollTo({
      left: scrollDivRef.current!.scrollLeft - sizeScroll,
      behavior: "smooth",
    });
  }, [scrollDivRef.current]);

  /** Скролл в правую сторону */
  const scrollRight = useCallback(() => {
    setIsVisibleLeftScroll(true);
    scrollDivRef.current!.scrollTo({
      left: scrollDivRef.current!.scrollLeft + sizeScroll,
      behavior: "smooth",
    });
  }, [scrollDivRef.current]);

  /** Обработчик скролла */
  const handleScroll = useCallback(() => {
    setIsVisibleLeftScroll(!isStartScroll());
    setIsVisibleRightScroll(!isEndScroll());
  }, [isStartScroll, isEndScroll]);

  useEffect(() => {
    if (!(scrollDivRef.current instanceof HTMLDivElement)) {
      return;
    }
    setIsVisibleRightScroll(isNeedScroll());
  }, [scrollDivRef.current, children]);

  useEffect(() => {
    const container = scrollDivRef.current;
    if (!container || !(container instanceof HTMLDivElement)) return;

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollDivRef}
        className={`w-full overflow-auto flex hide-scrollbar items-start ${className}`}
      >
        {children}
        {isVisibleLeftScroll && <LeftScrollButton onClick={scrollLeft} />}
        {isVisibleRightScroll && <RightScrollButton onClick={scrollRight} />}
      </div>
    </div>
  );
};

export default HorizontalScrollContainer;
