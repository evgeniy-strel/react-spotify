import { useContext, useState } from "react";

import classes from "./MobilePlayer.module.css";
import { Artists } from "../components";

import { Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PauseButton from "./components/PauseButton";
import PreviousTrackButton from "./components/PreviousTrackButton";
import NextTrackButton from "./components/NextTrackButton";
import { PlayerContext } from "./context";
import Timeline from "./components/Timeline";
import { formatTimeTrack } from "../utils";

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

const MobilePlayer = ({ data }: any) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const showPlayer = () => {
    setIsShown(true);
  };

  const hidePlayer = () => {
    setIsShown(false);
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
        <div className="mt-3">
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
            <PreviousTrackButton />
            <PauseButton />
            <NextTrackButton />
          </div>
        </div>
      </div>
      {isShown && <Background />}
      <div className={`${classes.bar} py-4 px-6 gap-2`} onClick={showPlayer}>
        <img
          className="rounded-xl"
          src={data?.item.album.images?.at(0).url}
          width={50}
          height={50}
        />
        <div>
          <Typography.Text strong={true}>{data?.item?.name}</Typography.Text>
          {data?.item.artists && <Artists artists={data?.item.artists} />}
        </div>
      </div>
    </>
  );
};

export default MobilePlayer;
