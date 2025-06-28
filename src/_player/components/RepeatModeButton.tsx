import { useCallback, useContext, useEffect, useState } from "react";

import { ERepeatMode } from "../../utils";
import { Player } from "../../api";
import { PlayerContext } from "../context";

import { RetweetOutlined } from "@ant-design/icons";
import { Typography } from "antd";

const RepeatModeButton = () => {
  const { data } = useContext(PlayerContext);
  const [repeatMode, setRepeatMode] = useState<ERepeatMode>(ERepeatMode.off);
  const [isManualChanged, setIsManualChanged] = useState<boolean>(false);

  const changeRepeatMode = useCallback(() => {
    let newValue;
    switch (repeatMode) {
      case ERepeatMode.off:
        newValue = ERepeatMode.context;
        break;
      case ERepeatMode.context:
        newValue = ERepeatMode.track;
        break;
      default:
        newValue = ERepeatMode.off;
        break;
    }
    setRepeatMode(newValue);
    Player.setRepeatMode(newValue);
    setIsManualChanged(true);
  }, [repeatMode]);

  useEffect(() => {
    if (!isManualChanged) {
      setRepeatMode(data?.repeat_state);
    }
    setIsManualChanged(false);
  }, [data?.repeat_state]);

  return (
    <div
      title={
        repeatMode === ERepeatMode.off
          ? "Повторять"
          : repeatMode === ERepeatMode.context
          ? "Повторять один трек"
          : "Не повторять"
      }
      className="flex items-center relative cursor-pointer"
      onClick={changeRepeatMode}
    >
      <RetweetOutlined
        className="text-2xl cursor-pointer text-red-400"
        style={repeatMode !== ERepeatMode.off ? { color: "#1668DC" } : {}}
      />
      {repeatMode === ERepeatMode.track && (
        <Typography.Text
          className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%]"
          style={{ fontSize: 9, color: "#1668DC" }}
        >
          1
        </Typography.Text>
      )}
    </div>
  );
};

export default RepeatModeButton;
