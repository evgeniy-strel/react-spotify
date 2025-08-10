import { useCallback, useContext, useEffect, useState } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../../player";

import {
  CaretRightOutlined,
  PauseCircleFilled,
  PauseOutlined,
  PlayCircleFilled,
} from "@ant-design/icons";

const PauseButton = (props: { sizeClass?: string; isCircleIcon?: boolean }) => {
  const { data, refreshData } = useContext(PlayerContext);
  const [isPlaying, setIsPlaying] = useState<boolean>(data?.is_playing);
  const [isManualChanged, setIsManualChanged] = useState<boolean>(false);

  const PauseIcon = props.isCircleIcon ? PauseCircleFilled : PauseOutlined;
  const PlayIcon = props.isCircleIcon ? PlayCircleFilled : CaretRightOutlined;

  const size = props.sizeClass ?? "text-[42px]";
  const className = `cursor-pointer ${size}`;

  const playTrack = useCallback(async () => {
    Player.resumePlayback();
    setIsPlaying(true);
    setIsManualChanged(true);
    setTimeout(refreshData, 500);
  }, []);

  const stopTrack = useCallback(async () => {
    Player.pausePlayback();
    setIsPlaying(false);
    setIsManualChanged(true);
    setTimeout(refreshData, 500);
  }, []);

  useEffect(() => {
    if (!isManualChanged) {
      setIsPlaying(data?.is_playing);
    }
    setIsManualChanged(false);
  }, [data?.is_playing]);

  return (
    <>
      {isPlaying ? (
        <PauseIcon title="Пауза" className={className} onClick={stopTrack} />
      ) : (
        <PlayIcon title="Играть" className={className} onClick={playTrack} />
      )}
    </>
  );
};

export default PauseButton;
