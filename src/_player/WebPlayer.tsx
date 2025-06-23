import { useRef, useState, useEffect, useCallback } from "react";

import classes from "./WebPlayer.module.css";
import { Player as PlayerApi, Track } from "../api";
import { ERepeatMode, formatTimeTrack } from "../utils";
import { Artists, FavoriteButton } from "../components";

import { Slider, Typography } from "antd";
import {
  MutedOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
  RetweetOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SoundOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import PauseButton from "./components/PauseButton";
import PreviousTrackButton from "./components/PreviousTrackButton";
import NextTrackButton from "./components/NextTrackButton";
import Timeline from "./components/Timeline";

const WebPlayer = ({ data, refreshData }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>();
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const [repeatMode, setRepeatMode] = useState<ERepeatMode>(ERepeatMode.off);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  /** При обновлении значений, спотифай обновляет их не сразу, поэтому в состоянии плеера могут прийти старые значения
   * и перебить актуальные. Для этого ставим флаг, что эти значения актуальны и их трогать не нужно.
   */
  const [alreadyUpdated, setAlreadyUpdated] = useState({
    volume: false,
    repeat: false,
    shuffle: false,
  });
  const idTrack = data?.item?.id;

  const addToFavorites = useCallback(() => {
    Track.addToFavorite([idTrack]);
    setIsFavorite(true);
  }, [idTrack]);

  const removeFromFavorties = useCallback(() => {
    Track.removeFromFavorites([idTrack]);
    setIsFavorite(false);
  }, [idTrack]);

  const updateVolume = useCallback((value: number) => {
    PlayerApi.setVolume(value);
    changeVolume(value);
  }, []);

  const changeVolume = useCallback((value: number) => {
    setVolume(value);
    setAlreadyUpdated((value) => ({ ...value, volume: true }));
  }, []);

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
    PlayerApi.setRepeatMode(newValue);
    setAlreadyUpdated((value) => ({ ...value, repeat: true }));
  }, [repeatMode]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((value) => {
      PlayerApi.togglePlaybackShuffle(!value);
      return !value;
    });
    setAlreadyUpdated((value) => ({ ...value, shuffle: true }));
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (!alreadyUpdated.volume) {
      setVolume(data.device.volume_percent);
    }
    if (!alreadyUpdated.repeat) {
      setRepeatMode(data.repeat_state);
    }
    if (!alreadyUpdated.shuffle) {
      setIsShuffle(data.shuffle_state);
    }
    setAlreadyUpdated({
      volume: false,
      repeat: false,
      shuffle: false,
    });
  }, [data]);

  useEffect(() => {
    if (!idTrack) {
      return;
    }

    Track.checkSaved([idTrack]).then((data) => setIsFavorite(data[0]));
  }, [idTrack]);

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
              <FavoriteButton
                isFavorite={isFavorite}
                onClick={isFavorite ? removeFromFavorties : addToFavorites}
              />
            </div>
          </div>
          <div className="flex gap-4">
            {isShuffle ? (
              <SortDescendingOutlined
                title="Играть по порядку"
                className="text-2xl cursor-pointer"
                onClick={toggleShuffle}
              />
            ) : (
              <SortAscendingOutlined
                title="Играть в случайном порядке"
                className="text-2xl cursor-pointer"
                onClick={toggleShuffle}
              />
            )}
            <PreviousTrackButton />
            <PauseButton />
            <NextTrackButton />
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
                style={
                  repeatMode !== ERepeatMode.off ? { color: "#1668DC" } : {}
                }
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
