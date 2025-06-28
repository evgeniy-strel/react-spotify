import { useCallback } from "react";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface IProps {
  isFavorite: boolean | undefined;
  onClick: (value: boolean) => void;
  className?: string;
}

const FavoriteButton = ({ isFavorite, onClick, className }: IProps) => {
  const addToFavorites = useCallback(() => {
    onClick(true);
  }, [onClick]);

  const removeFromFavorties = useCallback(() => {
    onClick(false);
  }, [onClick]);

  return (
    <>
      {isFavorite ? (
        <HeartFilled
          className={className}
          onClick={removeFromFavorties}
          title="Удалить из любимых"
        />
      ) : (
        <HeartOutlined
          className={className}
          onClick={addToFavorites}
          title="Добавить в любимое"
        />
      )}
    </>
  );
};

export default FavoriteButton;
