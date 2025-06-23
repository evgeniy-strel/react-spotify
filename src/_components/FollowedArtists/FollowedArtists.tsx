import { useCallback, useEffect, useState } from "react";

import { ERoutes, Users } from "../../api";
import { getAccessToken } from "../../auth";
import classes from "./FollowedArtists.module.css";

import { Skeleton, Typography } from "antd";
import { useNavigate } from "react-router";

const COUNT_SKELETONS = 16;

export const FollowedArtists = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Users.getFollowedArtists().then(setData);
    }
  }, [accessToken]);

  return (
    <div>
      <Typography.Title level={2}>Вы подписаны</Typography.Title>
      <div
        className={`w-full overflow-auto flex overflow-auto gap-x-8 gap-y-3 hide-scrollbar`}
      >
        {data
          ? data?.artists?.items.map((item: any, index: number) => (
              <ItemTemplate key={item.id} item={item} />
            ))
          : new Array(COUNT_SKELETONS)
              .fill(0)
              .map((_, index) => <ItemSkeleton key={index} />)}
      </div>
    </div>
  );
};

const ItemTemplate = ({ item }: any) => {
  const navigate = useNavigate();

  const openPageArist = useCallback(() => {
    navigate(`${ERoutes.Artist}/${item.id}`);
  }, [item]);

  return (
    <div
      className="flex flex-col gap-2 items-center shrink-0 cursor-pointer"
      onClick={openPageArist}
    >
      <img className={classes.img} src={item.images.at(0).url} />
      <Typography.Text strong={true}>{item.name}</Typography.Text>
    </div>
  );
};

const ItemSkeleton = ({ item }: any) => {
  return (
    <div className="flex flex-col gap-2 items-center shrink-0">
      <Skeleton.Node
        style={{ width: 200, height: 200, borderRadius: "100%" }}
      />
      <Skeleton.Node style={{ height: "1rem", width: "7rem" }} active={true} />
    </div>
  );
};
