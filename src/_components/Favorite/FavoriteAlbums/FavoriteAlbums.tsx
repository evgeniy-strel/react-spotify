import { useEffect, useState } from "react";

import { Albums } from "../../../api";
import { getAccessToken } from "../../../auth";
import Artists from "../../Artists/Artists";
import { SquareTemplate } from "../../../itemTemplates";
import HorizontalScrollContainer from "../../HorizontalScrollContainer/HorizontalScrollContainer";

const COUNT_SKELETONS = 16;

export const FavoriteAlbums = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Albums.getFavorites().then(setData);
    }
  }, [accessToken]);

  return (
    <HorizontalScrollContainer className="gap-x-8 gap-y-3">
      <>
        {data
          ? data?.items?.map((item: any, index: number) => (
              <ItemTemplate key={item.album.id} item={item} />
            ))
          : new Array(COUNT_SKELETONS)
              .fill(0)
              .map((_, index) => <ItemSkeleton key={index} />)}
      </>
    </HorizontalScrollContainer>
  );
};

const ItemTemplate = ({ item }: any) => {
  const { album } = item;

  return (
    <SquareTemplate
      imgSrc={album.images.at(0).url}
      title={album.name}
      children={<Artists artists={album.artists} />}
    />
  );
};

const ItemSkeleton = () => {
  return <SquareTemplate.Skeleton />;
};
