import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Skeleton, Typography } from "antd";

import { ERoutes, Artists as ArtistsApi } from "../../api";
import { getNameArtists } from "../../utils";

interface IProps {
  artists: object[];
  className?: string;
  attr?: object;
  withImage?: boolean;
  textStyles?: object;
}

/**
 * Компонент для отображения названия артистов с возможностью перехода на их страничку
 */
const Artists = ({
  artists: initArtists,
  className,
  attr,
  withImage,
  textStyles,
}: IProps) => {
  const [artists, setArtists] = useState<object[]>(initArtists);
  const title = getNameArtists(artists);
  const navigate = useNavigate();

  const openPageArist = useCallback(
    (id: string) => {
      navigate(`${ERoutes.Artist}/${id}`);
    },
    [navigate]
  );

  const loadImages = useCallback(async () => {
    const promises = artists.map((item: any) => ArtistsApi.getArtist(item.id));
    const data = await Promise.all(promises);
    const newData = artists.map((item, index) => ({
      ...item,
      images: data[index].images,
    }));
    setArtists(newData);
  }, []);

  useEffect(() => {
    setArtists(initArtists);
    if (withImage) {
      loadImages();
    }
  }, [initArtists]);

  if (!initArtists?.length) {
    return <></>;
  }

  return (
    <div
      className={`truncate flex gap-${withImage ? 3 : 1} ${className} `}
      title={title}
      {...attr}
    >
      {artists.map((artist: any, index: number) => {
        const isLastItem = index === artists.length - 1;
        const caption = artist.name + (isLastItem || withImage ? "" : ", ");
        return (
          <div
            key={artist.id}
            className={`flex gap-2 items-center ${
              isLastItem ? "truncate" : ""
            }`}
            onClick={() => openPageArist(artist.id)}
          >
            {withImage ? (
              artist.images ? (
                <img
                  className="rounded-4xl cursor-pointer"
                  src={artist.images?.at(0).url}
                  width={24}
                  height={24}
                />
              ) : (
                <Skeleton.Node
                  className="rounded-4xl cursor-pointer"
                  style={{ width: 24, height: 24, borderRadius: "100%" }}
                  active={true}
                />
              )
            ) : (
              <></>
            )}
            <Typography.Text className="truncate" style={textStyles}>
              <span
                key={index}
                className="hover:text-stone-400 cursor-pointer truncate"
              >
                {caption}
              </span>
            </Typography.Text>
          </div>
        );
      })}
    </div>
  );
};

export default Artists;
