import { useEffect, useRef, useState } from "react";

import { Track } from "../../../api";
import { getAccessToken } from "../../../auth";
import Artists from "../../Artists/Artists";
import { SquareTemplate } from "../../../itemTemplates";
import HorizontalScrollContainer from "../../HorizontalScrollContainer/HorizontalScrollContainer";

const COUNT_SKELETONS = 16;

export const FavoriteTracks = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Track.getFavorites().then(setData);
    }
  }, [accessToken]);

  return (
    <HorizontalScrollContainer className="gap-x-8 gap-y-3">
      <>
        {data
          ? data?.items.map((item: any, index: number) => (
              <ItemTemplate key={item.track.id} item={item} />
            ))
          : new Array(COUNT_SKELETONS)
              .fill(0)
              .map((_, index) => <ItemSkeleton key={index} />)}
      </>
    </HorizontalScrollContainer>
  );
};

const ItemTemplate = ({ item }: any) => {
  const { track } = item;

  return (
    <SquareTemplate
      imgSrc={track.album.images.at(0).url}
      title={track.name}
      children={<Artists artists={track.artists} />}
    />
  );
};

const ItemSkeleton = () => {
  return <SquareTemplate.Skeleton />;
};
