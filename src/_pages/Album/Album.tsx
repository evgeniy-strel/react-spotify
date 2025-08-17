import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import classes from "./Album.module.css";
import { getAccessToken } from "../../auth";
import { Albums, Artists, ERoutes, Player } from "../../api";
import {
  Artists as ArtistsComponent,
  AudioVisualizer,
  HorizontalScrollContainer,
} from "../../components";

import { useNavigate, useParams } from "react-router";
import { Button, Skeleton, Typography } from "antd";
import { ListTemplate, SquareTemplate } from "../../itemTemplates";
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
      className={`${classes.imgArtist} rounded-3xl w-[260px] h-[260px]`}
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
          {data && <ArtistsComponent artists={data.artists} withImage={true} />}
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

const ReccomendedAlbums = () => {
  const { isLoading: albumDataIsLoading, data: albumData } =
    useContext(AlbumContext);
  const navigate = useNavigate();

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const artistsIds = useMemo(
    () => albumData?.artists?.map((artist: any) => artist.id),
    [albumData]
  );

  const loadData = useCallback(async () => {
    setIsLoading(true);
    const promises = artistsIds.map((id: string) => Artists.getAlbums(id));
    const results = await Promise.all(promises);
    const allAlbums = results.reduce(
      (albums: Array<object>, result) => [...albums, ...result.items],
      []
    );
    const otherAlbums = allAlbums.filter(
      (album: any) => album.id !== albumData.id
    );
    setData(otherAlbums);
    setIsLoading(false);
  }, [artistsIds]);

  useEffect(() => {
    if (artistsIds?.length) {
      loadData();
    }
  }, [artistsIds]);

  const onClick = useCallback((id: string) => {
    navigate(`${ERoutes.Album}/${id}`);
  }, []);

  return (
    <div className="h-full">
      <Typography.Title level={3}>Другие альбомы</Typography.Title>
      <div className="flex flex-col gap-6 h-full overflow-scroll pr-2">
        <>
          {!isLoading
            ? data?.map((item: any, index: number) => (
                <SquareTemplate
                  key={item.id}
                  imgSrc={item.images.at(0).url}
                  title={item.name}
                  trackForPause={item}
                  widthClassName="w-full"
                  onClick={() => onClick(item.id)}
                >
                  <ArtistsComponent artists={item.artists} />
                </SquareTemplate>
              ))
            : new Array(16)
                .fill(0)
                .map((_, index) => <SquareTemplate.Skeleton key={index} />)}
        </>
      </div>
    </div>
  );
};

const Tracks = () => {
  const { isLoading, data } = useContext(AlbumContext);
  const { data: playerData } = useContext(PlayerContext);

  return (
    <div>
      <div className={`grid gap-x-5 gap-y-3`}>
        {!isLoading
          ? data.tracks.items.map((track: any, index: number) => {
              const isTrackPlaying = track.uri === playerData?.item?.uri;
              const isPlaying = isTrackPlaying && playerData?.is_playing;

              return (
                <ListTemplate
                  key={track.id}
                  track={track}
                  visualizer={false}
                  leftContent={
                    isPlaying ? (
                      <div className="p-1.5">
                        <AudioVisualizer />
                      </div>
                    ) : (
                      <div
                        className={`p-2 min-w-[32px] ${
                          isTrackPlaying ? "text-blue-500" : "text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )
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

  const contentRef = useRef<any>(null);

  useEffect(() => {
    loadData(id);
  }, [accessToken, id]);

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if (!contentRef.current) {
      return;
    }
    const handleScroll = () => {
      setIsSmall(contentRef.current.scrollTop > 50);
    };
    contentRef.current.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AlbumContext.Provider value={{ isLoading, data }}>
      <div
        className={`${classes.albumContainer} h-full ml-6 mr-6 mt-4 box-border flex gap-8 box-border`}
      >
        <div
          ref={contentRef}
          className="w-full h-full flex flex-col gap-6 overflow-y-auto py-[-6]"
        >
          <div
            className={`z-[1] sticky top-[0] ${
              isSmall ? "h-[100px]" : "h-auto"
            }`}
          >
            <Header />
          </div>
          <div className="h-full pr-4">
            <Tracks />
          </div>
        </div>
        <div className={`${classes.reccomendedAlbums} h-full w-[300px]`}>
          <ReccomendedAlbums />
        </div>
      </div>
    </AlbumContext.Provider>
  );
};

export default Album;
