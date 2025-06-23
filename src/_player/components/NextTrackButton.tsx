import { useCallback, useContext } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";

import { StepForwardOutlined } from "@ant-design/icons";

const NextTrackButton = () => {
  const { refreshData } = useContext(PlayerContext);

  const skipToNext = useCallback(async () => {
    await Player.skipToNext();
    setTimeout(() => refreshData(), 500);
  }, []);

  return (
    <>
      <StepForwardOutlined
        title="Вперед"
        className="text-3xl cursor-pointer"
        onClick={skipToNext}
      />
    </>
  );
};

export default NextTrackButton;
