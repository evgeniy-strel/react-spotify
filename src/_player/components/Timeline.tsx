import { useCallback, useContext, useEffect, useState } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";
import { formatTimeTrack } from "../../utils";

import { Slider } from "antd";

interface IProps {
  onChange: (value: number) => void;
}

/**
 * Полоса изменения времени трека
 */
const Timeline = ({ onChange }: IProps) => {
  const { data } = useContext(PlayerContext);
  const [sliderValue, setSliderValue] = useState<number>(
    data?.progress_ms || 0
  );
  const [isManualChanged, setIsManualChanged] = useState<boolean>(false);

  const seekToPosition = useCallback((value: number) => {
    Player.seekToPosition(value);
    changeSliderValue(value);
    setIsManualChanged(true);
  }, []);

  const changeSliderValue = useCallback(
    (value: number) => {
      setSliderValue(value);
      onChange(value);
    },
    [onChange]
  );

  useEffect(() => {
    if (!isManualChanged) {
      changeSliderValue(data?.progress_ms || 0);
    }
    setIsManualChanged(false);
  }, [data?.progress_ms]);

  return (
    <div className="relative top-[-4px] ">
      <Slider
        className="w-full"
        min={0}
        max={data?.item.duration_ms}
        value={sliderValue}
        tooltip={{
          formatter: (value) => formatTimeTrack(sliderValue),
        }}
        onChange={setSliderValue}
        onChangeComplete={seekToPosition}
        styles={{
          track: { backgroundColor: "#e6e6e6" },
          handle: { border: "none" },
          root: { marginTop: 0, marginBottom: 0 },
        }}
      />
    </div>
  );
};

export default Timeline;
