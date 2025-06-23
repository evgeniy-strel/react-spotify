import { useCallback, useEffect, useRef, useState } from "react";

import classes from "./Album.module.css";
import { getAccessToken } from "../../auth";
import { Albums } from "../../api";

import { useParams } from "react-router";
import { Skeleton, Typography } from "antd";
import { Artists } from "../../components";

const Header = () => {
  const accessToken = getAccessToken();
  let { id } = useParams() as { id: string };
  const [data, setData] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
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
        className={`${classes.header__info} w-full truncate flex flex-col`}
        style={{ flex: "1 1 200px" }}
      >
        {!isLoading ? (
          <Typography.Title
            className={`${classes.header__title} truncate`}
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
        <div className="mb-6">
          {/* {!isLoading ? (
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
          )} */}
          {/* <SubscribeButton className="mt-1" artistId={id} /> */}
        </div>
        {/* <div>
            <Typography.Text className="block">Популярность</Typography.Text>
            <Progress percent={data?.popularity} size={[300, 10]} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

const Album = () => {
  return (
    <div className="ml-6 mr-6 mt-4 box-border flex flex-col gap-4">
      <Header />
    </div>
  );
};

export default Album;
