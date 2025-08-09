import {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import classes from "./PauseTrackButton.module.css";
import { Player } from "../../api";
import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import { PlayerContext } from "../../player";

const PauseTrackButton = (props: any) => {
  const {
    track,
    sizeClassName = "text-3xl",
    heightClassName = "h-full",
    className,
  } = props;
  const { data, refreshData } = useContext(PlayerContext);
  const currentPlayingTrack = data?.item?.uri;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playTrack = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (currentPlayingTrack === track.uri) {
        await Player.resumePlayback();
      } else {
        if (track.type === "track") {
          await Player.playTrack({ uri: track.uri });
        } else {
          await Player.playContextUri(track.uri);
        }
      }
      setIsPlaying(true);
      // Задержка нужна, тк спотифай не сразу обновляет данные
      setTimeout(() => refreshData(), 300);
    },
    [refreshData, track.id, currentPlayingTrack]
  );

  const pauseTrack = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      await Player.pausePlayback();
      setIsPlaying(false);
      refreshData();
    },
    [refreshData, track.id]
  );

  useEffect(() => {
    // В случае, если проигрывается альбом/артист, должен быть uri в контексте
    if (data?.context) {
      setIsPlaying(data?.context?.uri === track.uri);
    } else {
      setIsPlaying(currentPlayingTrack === track.uri);
    }
  }, [currentPlayingTrack]);

  return (
    <div
      className={`${classes.playButton} flex w-full absolute left-[0] top-[0] items-center justify-center cursor-pointer ${className} ${heightClassName}`}
    >
      <div className={`${sizeClassName}`}>
        {isPlaying ? (
          <PauseCircleFilled onClick={pauseTrack} />
        ) : (
          <PlayCircleFilled onClick={playTrack} />
        )}
      </div>
    </div>
  );
};

export default PauseTrackButton;
