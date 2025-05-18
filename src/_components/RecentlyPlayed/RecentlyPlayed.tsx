import { useCallback, useContext, useMemo, useState } from "react";

import { formatTimeTrack } from "../../utils";
import classes from "./RecentlyPlayed.module.css";

import { Skeleton, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Track } from "../../api";
import { AuthProvider } from "../../contexts/AuthProvider";

const COUNT_TRACKS = 16;
const { Title } = Typography;

export const RecentlyPlayed = ({ data }: any) => {
    const { items } = data;

    return (
        <div>
            <Title level={2}>Недавно прослушано</Title>
            <div className={`${classes.grid} hide-scrollbar w-full overflow-auto gap-x-6 gap-y-3`}>
                {items
                    ? items?.slice(0, COUNT_TRACKS).map((item: any, index: number) => {
                          return <RecentlyPlayedTrack item={item} />;
                      })
                    : new Array(COUNT_TRACKS).fill(0).map(() => <RecentlyPlayedTrackSkeleton />)}
            </div>
        </div>
    );
};

const RecentlyPlayedTrackSkeleton = () => {
    return (
        <div className="flex items-center gap-2">
            <Skeleton.Node className="rounded-lg" style={{ width: 54, height: 54 }} active={true} />
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

export const RecentlyPlayedTrack = ({ item }: any) => {
    const { accessToken } = useContext(AuthProvider);
    const { track } = item;

    const [isFavorite, setIsFavorite] = useState(track.is_favorite);
    const duration = useMemo(() => formatTimeTrack(track.duration_ms), [track.duration_ms]);
    const artists = track.artists.map((artist: any) => artist.name).join(", ");

    const addToFavorties = useCallback(() => {
        Track.saveTracks(accessToken, [track.id]);
        setIsFavorite(true);
    }, [track.id]);

    const removeFromFavorties = useCallback(() => {
        Track.removeFromFavorites(accessToken, [track.id]);
        setIsFavorite(false);
    }, [track.id]);

    return (
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
                <Typography.Text className="truncate" title={artists}>
                    {artists}
                </Typography.Text>
            </div>
            <div className="ml-auto flex items-center gap-3">
                <div className="ml-auto shrink-0">
                    {isFavorite ? (
                        <HeartFilled onClick={removeFromFavorties} />
                    ) : (
                        <HeartOutlined onClick={addToFavorties} />
                    )}
                </div>
                <div className="shrink-0 truncate">
                    <Typography.Text>{duration}</Typography.Text>
                </div>
            </div>
        </div>
    );
};
