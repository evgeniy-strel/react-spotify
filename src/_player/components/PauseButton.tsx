import { useCallback, useContext, useEffect, useState } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";

import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";

const PauseButton = () => {
  const { data } = useContext(PlayerContext);
  const [isPlaying, setIsPlaying] = useState<boolean>(data?.is_playing);
  const [isManualChanged, setIsManualChanged] = useState<boolean>(false);

  const playTrack = useCallback(async () => {
    Player.resumePlayback();
    setIsPlaying(true);
    setIsManualChanged(true);
  }, []);

  const stopTrack = useCallback(async () => {
    Player.pausePlayback();
    setIsPlaying(false);
    setIsManualChanged(true);
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
        <PauseCircleFilled
          title="Пауза"
          className="text-[42px] cursor-pointer"
          onClick={stopTrack}
        />
      ) : (
        <PlayCircleFilled
          title="Играть"
          className="text-[42px] cursor-pointer"
          onClick={playTrack}
        />
      )}
    </>
  );
};

export default PauseButton;
