import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import classes from "./Album.module.css";
import { getAccessToken } from "../../auth";
import { Albums, Player } from "../../api";
import { Artists } from "../../components";

import { useParams } from "react-router";
import { Button, Skeleton, Typography } from "antd";
import { ListTemplate } from "../../itemTemplates";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { PlayerContext } from "../../player";

interface IAlbumContext {
  data: Record<string, any>;
  isLoading: boolean;
}

const AlbumContext = createContext<IAlbumContext>({
  data: {},
  isLoading: true,
});

const ImageAlbum = () => {
  const { isLoading, data } = useContext(AlbumContext);

  return isLoading ? (
    <Skeleton.Node
      className={`${classes.imgArtist} rounded-3xl`}
      style={{ width: 260, height: 260 }}
      active={true}
    />
  ) : (
    <img
      className={`${classes.imgArtist} rounded-3xl w-[260px]`}
      src={data.images?.at(0).url}
    />
  );
};

const PlayButton = () => {
  const { isLoading, data } = useContext(AlbumContext);
  const { data: playerData, refreshData } = useContext(PlayerContext);

  const isAlbumPlaying = data?.uri && data?.uri === playerData?.context?.uri;
  const isPlaying = Boolean(isAlbumPlaying && playerData?.is_playing);
  const Icon = isPlaying ? PauseOutlined : CaretRightOutlined;

  const onClick = useCallback(async () => {
    if (isPlaying) {
      await Player.pausePlayback();
    } else {
      if (isAlbumPlaying) {
        await Player.resumePlayback();
      } else {
        await Player.playContextUri(data.uri);
      }
    }
    // Задержка нужна тк спотифай не успевает обновить данные
    setTimeout(refreshData, 250);
  }, [data, isPlaying]);

  return (
    <Button
      type="primary"
      size="large"
      icon={<Icon />}
      loading={isLoading}
      disabled={isLoading}
      onClick={onClick}
    >
      Слушать
    </Button>
  );
};

const Header = () => {
  const { isLoading, data } = useContext(AlbumContext);

  return (
    <div className={`${classes.header} w-full flex gap-4 overflow-hidden`}>
      <ImageAlbum />
      <div className={`${classes.header__info} w-full flex flex-col`}>
        <Typography.Title level={3}>Альбом</Typography.Title>
        {!isLoading ? (
          <Typography.Title
            className={`${classes.header__title} line-clamp-2 w-full`}
            level={1}
          >
            {data?.name}
          </Typography.Title>
        ) : (
          <Skeleton.Node
            className="w-full mt-2"
            style={{ height: "3rem", width: "25rem" }}
            active={true}
          />
        )}
        <div className="flex gap-4">
          {data && <Artists artists={data.artists} withImage={true} />}
        </div>
        <div className="flex gap-1 mt-2">
          <Typography.Text>{data?.release_date.split("-")[0]}</Typography.Text>
          <Typography.Text> • </Typography.Text>
          <Typography.Text>{data?.total_tracks} треков</Typography.Text>
        </div>
        <div className="mt-4">
          <PlayButton />
        </div>
      </div>
    </div>
  );
};

const COUNT_SKELETONS = 12;

const Tracks = () => {
  const { isLoading, data } = useContext(AlbumContext);

  return (
    <div>
      <div className={`grid gap-x-5 gap-y-3`}>
        {!isLoading
          ? data.tracks.items.map((track: any, index: number) => {
              return (
                <ListTemplate
                  key={track.id}
                  track={track}
                  leftContent={
                    <div className="p-3 text-gray-500">{index + 1}</div>
                  }
                />
              );
            })
          : new Array(COUNT_SKELETONS)
              .fill(0)
              .map((_, index) => <ListTemplate.Skeleton key={index} />)}
      </div>
    </div>
  );
};

const Album = () => {
  const accessToken = getAccessToken();
  let { id } = useParams() as { id: string };
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async (id: string) => {
    if (accessToken) {
      setIsLoading(true);
      await Albums.getAlbum(id).then(setData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(id);
  }, [accessToken, id]);

  return (
    <AlbumContext.Provider value={{ isLoading, data }}>
      <div className="ml-6 mr-6 mt-4 box-border flex flex-col gap-6">
        <Header />
        <Tracks />
      </div>
    </AlbumContext.Provider>
  );
};

export default Album;
