import { useCallback, useEffect, useMemo, useState } from "react";

import classes from "./RecentlyPlayed.module.css";
import { formatTimeTrack } from "../../utils";
import { Player, Track } from "../../api";
import { getAccessToken } from "../../auth";
import Artists from "../Artists/Artists";

import { Skeleton, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const COUNT_TRACKS = 16;
const { Title } = Typography;

const RecentlyPlayed = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Player.getRecentlyPlayed().then(setData);
    }
  }, [accessToken]);

  return (
    <div>
      <Title level={2}>Недавно прослушано</Title>
      <div
        className={`${classes.grid} hide-scrollbar w-full overflow-auto gap-x-6 gap-y-3`}
      >
        {data
          ? data?.items
              ?.slice(0, COUNT_TRACKS)
              .map((item: any, index: number) => {
                return (
                  <ItemTemplate
                    key={item.track.id + ":" + item.played_at}
                    track={item.track}
                  />
                );
              })
          : new Array(COUNT_TRACKS)
              .fill(0)
              .map((_, index) => <ItemSkeleton key={index} />)}
      </div>
    </div>
  );
};

const ItemSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton.Node
        className="rounded-lg"
        style={{ width: 54, height: 54 }}
        active={true}
      />
      <div className="w-full mr-1 flex flex-col gap-1.5">
        <Skeleton.Node
          className="w-full"
          style={{ height: "1rem", width: "11rem" }}
          active={true}
        />
        <Skeleton.Node
          className="w-full"
          style={{ height: "1rem", width: "11rem" }}
          active={true}
        />
      </div>
    </div>
  );
};

const ItemTemplate = ({ track }: any) => {
  const [isFavorite, setIsFavorite] = useState(track.is_favorite);
  const duration = useMemo(
    () => formatTimeTrack(track.duration_ms),
    [track.duration_ms]
  );

  const addToFavorites = useCallback(() => {
    Track.addToFavorite([track.id]);
    setIsFavorite(true);
  }, [track.id]);

  const removeFromFavorties = useCallback(() => {
    Track.removeFromFavorites([track.id]);
    setIsFavorite(false);
  }, [track.id]);

  return (
    <div className="flex w-full justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        <img
          className="rounded-lg"
          width={54}
          height={54}
          src={track.album.images?.at(0)?.url}
        />
        <div className="truncate mr-1">
          <Typography.Text strong={true} className="block truncate">
            {track.name}
          </Typography.Text>
          <Artists artists={track.artists} />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="ml-auto shrink-0">
          {isFavorite ? (
            <HeartFilled onClick={removeFromFavorties} />
          ) : (
            <HeartOutlined onClick={addToFavorites} />
          )}
        </div>
        <div className="shrink-0 truncate">
          <Typography.Text>{duration}</Typography.Text>
        </div>
      </div>
    </div>
  );
};

RecentlyPlayed.ItemTemplate = ItemTemplate;
RecentlyPlayed.ItemSkeleton = ItemSkeleton;

export default RecentlyPlayed;
