import { useCallback, useContext, useEffect, useState } from "react";

import { Track } from "../../api";
import { PlayerContext } from "../context";
import { FavoriteButton as FavoriteButtonComponent } from "../../components";

const FavoriteButton = (props: { sizeClass?: string }) => {
  const { data } = useContext(PlayerContext);
  const idTrack = data?.item?.id;

  const [isFavorite, setIsFavorite] = useState<boolean>();

  const addToFavorites = useCallback(() => {
    Track.addToFavorite([idTrack]);
    setIsFavorite(true);
  }, [idTrack]);

  const removeFromFavorties = useCallback(() => {
    Track.removeFromFavorites([idTrack]);
    setIsFavorite(false);
  }, [idTrack]);

  useEffect(() => {
    if (!idTrack) {
      return;
    }

    Track.checkSaved([idTrack]).then((data) => setIsFavorite(data[0]));
  }, [idTrack]);

  return (
    <>
      <FavoriteButtonComponent
        className={props.sizeClass}
        isFavorite={isFavorite}
        onClick={isFavorite ? removeFromFavorties : addToFavorites}
      />
    </>
  );
};

export default FavoriteButton;
