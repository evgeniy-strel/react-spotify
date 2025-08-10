import { useEffect } from "react";

const HOTKEYS_CODES = ["Space"];

/** Хук, прослушивающий нажатие горячих клавиш. Вызывает переданный колбэк с аргументом нажатой клавиши */
export function useListenHotkeys(callback: (code: string) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (HOTKEYS_CODES.includes(event.code)) {
        callback(event.code);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Удаляем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback]);

  return <></>;
}

export default useListenHotkeys;
