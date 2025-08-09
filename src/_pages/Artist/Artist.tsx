import { useCallback, useEffect, useRef, useState } from "react";

import classes from "./Artist.module.css";

import { Artists, ERoutes, Users } from "../../api";
import { getAccessToken } from "../../auth";
import {
  Artists as ArtistsComponent,
  RecentlyPlayed,
  HorizontalScrollContainer,
} from "../../components";
import { SquareTemplate } from "../../itemTemplates";

import { useNavigate, useParams } from "react-router";
import { Button, Progress, Skeleton, Typography } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

/**
 * Кнопка подписки/отписки от артиста. Сама вычисляет состояние, на время загрузки дизейблится
 */
const SubscribeButton = ({
  artistId,
  className,
}: {
  artistId: string;
  className?: string;
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const caption = isSubscribed ? "Вы уже подписаны" : "Подписаться";

  const reloadSubscribeData = useCallback(() => {
    setIsLoading(true);
    Users.isUserFollowOnArtist([artistId]).then((value) => {
      setIsSubscribed(value[0]);
      setIsLoading(false);
    });
  }, [artistId]);

  useEffect(() => {
    reloadSubscribeData();
  }, [artistId]);

  const onClick = useCallback(async () => {
    setIsLoading(true);
    if (isSubscribed) {
      await Users.unFollowArtist([artistId]).then(reloadSubscribeData);
    } else {
      await Users.followArtist([artistId]).then(reloadSubscribeData);
    }
    setIsLoading(false);
  }, [isSubscribed]);

  return (
    <div className={className}>
      <Button
        type="primary"
        size="middle"
        icon={isSubscribed ? <HeartFilled /> : <HeartOutlined />}
        loading={isLoading}
        disabled={isLoading}
        onClick={onClick}
      >
        {caption}
      </Button>
    </div>
  );
};

const Header = () => {
  const accessToken = getAccessToken();
  let { id } = useParams() as { id: string };
  const [data, setData] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async (id: string) => {
    if (accessToken) {
      setIsLoading(true);
      await Artists.getArtist(id).then(setData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(id);
  }, [accessToken, id]);

  return (
    <div>
      <div
        ref={ref}
        className={`${classes.header} w-full flex gap-4 overflow-hidden`}
      >
        <div>
          {!isLoading ? (
            <img
              className={`${classes.imgArtist} rounded-3xl w-[260px]`}
              src={data.images?.at(0).url}
            />
          ) : (
            <Skeleton.Node
              className={`${classes.imgArtist} rounded-3xl`}
              style={{ width: 260, height: 260 }}
              active={true}
            />
          )}
        </div>
        <div
          className={`${classes.header__info} w-full flex flex-col`}
          style={{ flex: "1 1 200px" }}
        >
          {!isLoading ? (
            <Typography.Title
              className={`${classes.header__title} line-clamp-[2]`}
              level={1}
            >
              {data?.name}
            </Typography.Title>
          ) : (
            <Skeleton.Node
              className="w-full mt-2"
              style={{ height: "3rem", width: "12rem" }}
              active={true}
            />
          )}
          <div className="mb-6">
            {!isLoading ? (
              <Typography.Text>
                {data?.followers.total.toLocaleString() + " "} подписчиков
              </Typography.Text>
            ) : (
              <div className="mt-8">
                <Skeleton.Node
                  className="w-full"
                  style={{ height: "1rem", width: "10rem" }}
                  active={true}
                />
              </div>
            )}
            <SubscribeButton className="mt-1" artistId={id} />
          </div>
          <div>
            <Typography.Text className="block">Популярность</Typography.Text>
            <Progress percent={data?.popularity} size={[300, 10]} />
          </div>
        </div>
      </div>
    </div>
  );
};

const COUNT_TRACKS = 10;

const TopTracks = ({ tracks }: any) => {
  const accessToken = getAccessToken();
  let { id } = useParams() as { id: string };

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await Artists.getTopTracks(id).then(setData);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (accessToken) {
      loadData();
    }
  }, [accessToken, id]);

  return (
    <div>
      <Typography.Title level={3}>Популярные треки</Typography.Title>
      <div className={`${classes.grid} grid gap-x-5 gap-y-3`}>
        {!isLoading
          ? data.tracks
              ?.slice(0, COUNT_TRACKS)
              .map((track: any, index: number) => {
                return (
                  <RecentlyPlayed.ItemTemplate key={track.id} track={track} />
                );
              })
          : new Array(COUNT_TRACKS)
              .fill(0)
              .map((_, index) => <RecentlyPlayed.ItemSkeleton key={index} />)}
      </div>
    </div>
  );
};

const Albums = () => {
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  let { id } = useParams() as { id: string };

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await Artists.getAlbums(id).then(setData);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (accessToken) {
      loadData();
    }
  }, [accessToken, id]);

  const onClick = useCallback((id: string) => {
    navigate(`${ERoutes.Album}/${id}`);
  }, []);

  return (
    <div>
      <Typography.Title level={3}>Альбомы</Typography.Title>
      <HorizontalScrollContainer className="items-start  gap-x-8 gap-y-3">
        <>
          {!isLoading
            ? data?.items?.map((item: any, index: number) => (
                <SquareTemplate
                  key={item.id}
                  imgSrc={item.images.at(0).url}
                  title={item.name}
                  trackForPause={item}
                  onClick={() => onClick(item.id)}
                >
                  <ArtistsComponent artists={item.artists} />
                </SquareTemplate>
              ))
            : new Array(16)
                .fill(0)
                .map((_, index) => <SquareTemplate.Skeleton key={index} />)}
        </>
      </HorizontalScrollContainer>
    </div>
  );
};

const Singles = () => {
  const accessToken = getAccessToken();
  let { id } = useParams() as { id: string };

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await Artists.getSingles(id).then(setData);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (accessToken) {
      loadData();
    }
  }, [accessToken, id]);

  return (
    <div>
      <Typography.Title level={3}>Синглы</Typography.Title>
      <HorizontalScrollContainer className="items-start gap-x-8 gap-y-3">
        <>
          {!isLoading
            ? data?.items?.map((item: any, index: number) => (
                <SquareTemplate
                  key={item.id}
                  imgSrc={item.images.at(0).url}
                  title={item.name}
                  trackForPause={item}
                >
                  <ArtistsComponent artists={item.artists} />
                </SquareTemplate>
              ))
            : new Array(16)
                .fill(0)
                .map((_, index) => <SquareTemplate.Skeleton key={index} />)}
        </>
      </HorizontalScrollContainer>
    </div>
  );
};

const Artist = () => {
  return (
    <div className="ml-6 mr-6 mt-4 box-border flex flex-col gap-4">
      <Header />
      <TopTracks />
      <Albums />
      <Singles />
    </div>
  );
};

export default Artist;
