import { useEffect, useState } from "react";

import { Audiobooks } from "../../../api";
import { getAccessToken } from "../../../auth";

import { Typography } from "antd";
import { SquareTemplate } from "../../../itemTemplates";
import HorizontalScrollContainer from "../../HorizontalScrollContainer/HorizontalScrollContainer";

const COUNT_SKELETONS = 16;

export const FavoriteBooks = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Audiobooks.getFavorites().then(setData);
    }
  }, [accessToken]);

  return (
    <HorizontalScrollContainer className="gap-x-8 gap-y-3 hide-scrollbar">
      <>
        {data
          ? data?.items
              ?.filter((item: any) => item)
              .map((item: any, index: number) => (
                <ItemTemplate key={item.id} item={item} />
              ))
          : new Array(COUNT_SKELETONS)
              .fill(0)
              .map((_, index) => <ItemSkeleton key={index} />)}
      </>
    </HorizontalScrollContainer>
  );
};

const ItemTemplate = ({ item }: any) => {
  const authors = item.authors.map((author: any) => author.name).join(", ");

  return (
    <SquareTemplate imgSrc={item.images.at(0).url} title={item.name}>
      <Typography.Text className="line-clamp-1">{authors}</Typography.Text>
    </SquareTemplate>
  );
};

const ItemSkeleton = () => {
  return <SquareTemplate.Skeleton />;
};
