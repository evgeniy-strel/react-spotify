import { FC, JSX, useCallback, useMemo, useState } from "react";

import { PauseTrackButton } from "../../player";
import { formatTimeTrack } from "../../utils";
import { Track } from "../../api";
import { Artists } from "../../components";

import { Skeleton, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

interface IProps {
  track: Record<string, any>;
  leftContent?: JSX.Element;
}

const ListTemplate = ({ track, leftContent }: IProps) => {
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
    <div className="flex w-full justify-between items-center gap-2 overflow-hidden">
      <div className="flex items-center gap-2 shrink-1 min-w-[0]">
        <div className="relative">
          {track.album?.images?.length ? (
            <img
              className="rounded-lg"
              width={54}
              height={54}
              src={track.album.images?.at(0)?.url}
            />
          ) : leftContent ? (
            leftContent
          ) : (
            <></>
          )}
          <PauseTrackButton track={track} />
        </div>
        <div className="truncate mr-1">
          <Typography.Text strong={true} className="block truncate">
            {track.name}
          </Typography.Text>
          <Artists artists={track.artists} />
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
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

ListTemplate.Skeleton = ItemSkeleton;

export default ListTemplate;
