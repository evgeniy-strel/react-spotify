import { useState, useEffect, useCallback } from "react";

import { getAccessToken } from "../auth";
import { Player as PlayerApi } from "../api";

import WebPlayer from "./WebPlayer";
import MobilePlayer from "./MobilePlayer";
import { PlayerContext } from "./context";

const Player = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (accessToken) {
      setIsLoading(true);
      await PlayerApi.getState().then(setData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const intervalId = setInterval(loadData, 3500);
    return () => clearInterval(intervalId);
  }, [accessToken]);

  if (!data) {
    return <></>;
  }

  return (
    <div>
      <PlayerContext.Provider value={{ data, refreshData: loadData }}>
        <MobilePlayer data={data} refreshData={loadData} />
        <WebPlayer data={data} refreshData={loadData} />
      </PlayerContext.Provider>
    </div>
  );
};

export default Player;
