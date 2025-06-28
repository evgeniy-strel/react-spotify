import { useCallback, useContext } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";

import { StepBackwardOutlined } from "@ant-design/icons";

const PreviousTrackButton = (props: { sizeClass?: string }) => {
  const { refreshData } = useContext(PlayerContext);
  const size = props.sizeClass ?? "text-[42px]";

  const skipToPrevious = useCallback(async () => {
    await Player.skipToPrevious();
    setTimeout(() => refreshData(), 500);
  }, []);

  return (
    <>
      <StepBackwardOutlined
        title="Назад"
        className={`cursor-pointer ${size}`}
        onClick={skipToPrevious}
      />
    </>
  );
};

export default PreviousTrackButton;
