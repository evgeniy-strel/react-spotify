import { useRef, useState, useEffect, useCallback } from "react";

import classes from "./WebPlayer.module.css";
import { Player as PlayerApi } from "../../api";
import { formatTimeTrack } from "../../utils";
import { Artists } from "../../components";
import FavoriteButton from "../components/FavoriteButton";
import PauseButton from "../components/PauseButton";
import PreviousTrackButton from "../components/PreviousTrackButton";
import NextTrackButton from "../components/NextTrackButton";
import Timeline from "../components/Timeline";
import RepeatModeButton from "../components/RepeatModeButton";
import ShuffleButton from "../components/ShuffleButton";

import { Slider, Typography } from "antd";
import { MutedOutlined, SoundOutlined } from "@ant-design/icons";

const WebPlayer = ({ data, refreshData }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  /** При обновлении значений, спотифай обновляет их не сразу, поэтому в состоянии плеера могут прийти старые значения
   * и перебить актуальные. Для этого ставим флаг, что эти значения актуальны и их трогать не нужно.
   */
  const [alreadyUpdated, setAlreadyUpdated] = useState({
    volume: false,
  });

  const updateVolume = useCallback((value: number) => {
    PlayerApi.setVolume(value);
    changeVolume(value);
  }, []);

  const changeVolume = useCallback((value: number) => {
    setVolume(value);
    setAlreadyUpdated((value) => ({ ...value, volume: true }));
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!alreadyUpdated.volume) {
      setVolume(data.device.volume_percent);
    }
    setAlreadyUpdated({
      volume: false,
    });
  }, [data]);

  if (!data) {
    return;
  }

  return (
    <div className={`${classes.web__root} relative pb-3`}>
      <div
        className="bg-image absolute left-0 w-full h-full mt-16"
        style={{
          backgroundImage: `url(${data?.item.album.images?.at(0).url})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: -1,
          filter: "blur(55px)",
        }}
      ></div>
      <div className="pb-3 px-6 rounded-4xl">
        <Timeline onChange={setSliderValue} />
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-3 items-center">
            <img
              className="rounded-xl"
              src={data?.item.album.images?.at(0).url}
              width={50}
              height={50}
            />
            <div>
              <Typography.Text strong={true}>{data?.item.name}</Typography.Text>
              {data && <Artists artists={data?.item.artists} />}
            </div>
            <div className="ml-2">
              <FavoriteButton />
            </div>
          </div>
          <div className="flex gap-4">
            <ShuffleButton />
            <PreviousTrackButton />
            <PauseButton isCircleIcon={true} />
            <NextTrackButton />
            <RepeatModeButton />
          </div>
          <div className="flex gap-4 items-center">
            <Typography.Text>
              {formatTimeTrack(sliderValue)} /{" "}
              {formatTimeTrack(data?.item.duration_ms)}
            </Typography.Text>
            <div className="flex gap-1 items-center">
              {volume ? (
                <SoundOutlined className="text-xl" />
              ) : (
                <MutedOutlined className="text-xl relative right-[3px]" />
              )}
              <Slider
                className="w-24"
                min={0}
                max={100}
                value={volume}
                onChange={changeVolume}
                onChangeComplete={updateVolume}
                styles={{
                  track: { backgroundColor: "#e6e6e6" },
                  handle: { border: "none" },
                  root: { marginTop: 0, marginBottom: 0 },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebPlayer;
