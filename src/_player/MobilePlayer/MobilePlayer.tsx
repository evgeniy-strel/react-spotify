import { MouseEvent, useContext, useState } from "react";

import classes from "./MobilePlayer.module.css";
import { Artists } from "../../components";
import PauseButton from "./../components/PauseButton";
import PreviousTrackButton from "../components/PreviousTrackButton";
import NextTrackButton from "../components/NextTrackButton";
import { PlayerContext } from "../context";
import Timeline from "../components/Timeline";
import { formatTimeTrack } from "../../utils";
import FavoriteButton from "../components/FavoriteButton";
import RepeatModeButton from "../components/RepeatModeButton";
import ShuffleButton from "../components/ShuffleButton";

import { Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";

const Background = () => {
  const { data } = useContext(PlayerContext);
  return (
    <>
      <div
        className="bg-image absolute left-0 top-0 w-full h-full bg-center bg-cover z-1"
        style={{
          backgroundImage: `url(${data?.item.album.images?.at(0).url})`,
          filter: "blur(40px) brightness(90%)",
        }}
      ></div>
      <div className="bg-image absolute left-0 top-0 w-full h-full bg-neutral-400"></div>
    </>
  );
};

const MobilePlayer = () => {
  const { data } = useContext(PlayerContext);

  const [isShown, setIsShown] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const showPlayer = () => {
    setIsShown(true);
  };

  const hidePlayer = () => {
    setIsShown(false);
  };

  const onClickButtons = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className={`${classes.fullScreen} ${
          isShown ? classes.fullScreen_visible : ""
        } py-6 px-4`}
      >
        <div
          className="flex items-center justify-center mb-10"
          onClick={hidePlayer}
        >
          <DownOutlined style={{ fontSize: 20 }} />
        </div>

        <div className="flex flex-col justify-center items-center">
          <img
            className="rounded-xl w-full max-w-sm"
            src={data?.item?.album.images?.at(0).url}
          />
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div>
            <Typography.Title level={4} style={{ marginBottom: 0 }}>
              {data?.item?.name}
            </Typography.Title>
            {data && (
              <div onClick={hidePlayer}>
                <Artists
                  artists={data?.item.artists}
                  textStyles={{ fontSize: 16 }}
                />
              </div>
            )}
          </div>
          <FavoriteButton sizeClass="text-xl" />
        </div>
        <div className="mt-5">
          <Timeline onChange={setSliderValue} />
        </div>
        <div className="flex justify-between">
          <Typography.Text>{formatTimeTrack(sliderValue)}</Typography.Text>
          <Typography.Text>
            {formatTimeTrack(data?.item.duration_ms)}
          </Typography.Text>
        </div>
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-8">
            <ShuffleButton />
            <PreviousTrackButton sizeClass="text-4xl" />
            <PauseButton sizeClass="text-6xl" isCircleIcon={true} />
            <NextTrackButton sizeClass="text-4xl" />
            <RepeatModeButton />
          </div>
        </div>
      </div>
      {isShown && <Background />}
      <div
        className={`${classes.bar} py-4 px-6 gap-2 items-center`}
        onClick={showPlayer}
      >
        <img
          className="rounded-xl"
          src={data?.item.album.images?.at(0).url}
          width={50}
          height={50}
        />
        <div className="truncate">
          <Typography.Text className="truncate" strong={true}>
            {data?.item?.name}
          </Typography.Text>
          {data?.item.artists && <Artists artists={data?.item.artists} />}
        </div>
        <div className="flex gap-6 ml-auto" onClick={onClickButtons}>
          <FavoriteButton sizeClass="text-2xl" />
          <PauseButton sizeClass="text-2xl" />
          <NextTrackButton sizeClass="text-2xl" />
        </div>
      </div>
    </>
  );
};

export default MobilePlayer;
