import { useEffect, useState } from "react";

import { Albums } from "../../../api";
import { getAccessToken } from "../../../auth";
import { SquareTemplate } from "../../../itemTemplates";
import { HorizontalScrollContainer, Artists } from "../../../components";
import { Typography } from "antd";

const COUNT_SKELETONS = 16;

export const NewReleases = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Albums.getNewReleases().then(setData);
    }
  }, [accessToken]);

  return (
    <div>
      <Typography.Title level={2}>Новые релизы</Typography.Title>
      <HorizontalScrollContainer className="gap-x-8 gap-y-3">
        <>
          {data
            ? data.albums.items.map((item: any, index: number) => (
                <ItemTemplate key={item.id} item={item} />
              ))
            : new Array(COUNT_SKELETONS)
                .fill(0)
                .map((_, index) => <ItemSkeleton key={index} />)}
        </>
      </HorizontalScrollContainer>
    </div>
  );
};

const ItemTemplate = ({ item }: any) => {
  return (
    <SquareTemplate imgSrc={item.images.at(0).url} title={item.name}>
      <Artists artists={item.artists} />
    </SquareTemplate>
  );
};

const ItemSkeleton = () => {
  return <SquareTemplate.Skeleton />;
};
