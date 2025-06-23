import { useCallback, useContext } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";

import { StepBackwardOutlined } from "@ant-design/icons";

const PreviousTrackButton = () => {
  const { refreshData } = useContext(PlayerContext);

  const skipToPrevious = useCallback(async () => {
    await Player.skipToPrevious();
    setTimeout(() => refreshData(), 500);
  }, []);

  return (
    <>
      <StepBackwardOutlined
        title="Назад"
        className="text-3xl cursor-pointer"
        onClick={skipToPrevious}
      />
    </>
  );
};

export default PreviousTrackButton;
