import { useState, useEffect, useCallback } from "react";

import { getAccessToken } from "../auth";
import { Player as PlayerApi } from "../api";

import WebPlayer from "./WebPlayer/WebPlayer";
import MobilePlayer from "./MobilePlayer/MobilePlayer";
import { PlayerContext } from "./context";
import { useListenHotkeys } from "../hooks";

const PlayerProvider = ({ children }: any) => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const handleListenerHotkeys = useCallback(
    (code: string) => {
      if (code === "Space") {
        if (data.is_playing) {
          PlayerApi.pausePlayback();
        } else {
          PlayerApi.resumePlayback();
        }
        setData((data: any) => ({ ...data, is_playing: !data.is_playing }));
      }
    },
    [data]
  );

  useListenHotkeys(handleListenerHotkeys);

  const loadData = useCallback(async () => {
    if (accessToken) {
      setIsLoading(true);
      await PlayerApi.getState().then(setData);
      setIsLoading(false);
    }
  }, []);

  const refreshTimeline = () => {
    // setinterval создает замыкание и data неактуальная
    console.log(data);
  };

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 3000);
    const timelineId = setInterval(refreshTimeline, 1000);
    return () => {
      clearInterval(intervalId);
      clearInterval(timelineId);
    };
  }, [accessToken]);

  // вот тут неверно так делать, если нет ничего в плеере - обработать с ответом 204
  if (!data) {
    return <></>;
  }

  return (
    <PlayerContext.Provider value={{ data, refreshData: loadData }}>
      {children}
      <div>
        <MobilePlayer />
        <WebPlayer />
      </div>
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
