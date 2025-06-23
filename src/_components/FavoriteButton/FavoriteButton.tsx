import { useCallback } from "react";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface IProps {
  isFavorite: boolean | undefined;
  onClick: (value: boolean) => void;
}

const FavoriteButton = ({ isFavorite, onClick }: IProps) => {
  const addToFavorites = useCallback(() => {
    onClick(true);
  }, [onClick]);

  const removeFromFavorties = useCallback(() => {
    onClick(false);
  }, [onClick]);

  return (
    <>
      {isFavorite ? (
        <HeartFilled onClick={removeFromFavorties} />
      ) : (
        <HeartOutlined onClick={addToFavorites} />
      )}
    </>
  );
};

export default FavoriteButton;
