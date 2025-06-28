import { useCallback, useContext } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";

import { StepForwardOutlined } from "@ant-design/icons";

const NextTrackButton = (props: { sizeClass?: string }) => {
  const { refreshData } = useContext(PlayerContext);
  const size = props.sizeClass ?? "text-[42px]";

  const skipToNext = useCallback(async () => {
    await Player.skipToNext();
    setTimeout(() => refreshData(), 500);
  }, []);

  return (
    <>
      <StepForwardOutlined
        title="Вперед"
        className={`cursor-pointer ${size}`}
        onClick={skipToNext}
      />
    </>
  );
};

export default NextTrackButton;
