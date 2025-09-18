import { useCallback, useMemo, useState } from "react";

import { FavoriteTracks } from "./FavoriteTracks/FavoriteTracks";
import { FavoriteAlbums } from "./FavoriteAlbums/FavoriteAlbums";
import { FavoriteBooks } from "./FavoriteBooks/FavoriteBooks";

import { Segmented, Typography } from "antd";

enum ETabs {
  tracks = "Треки",
  albums = "Альбомы",
  audiobooks = "Аудиокниги",
}

const TABS_CONTENT = {
  [ETabs.tracks]: FavoriteTracks,
  [ETabs.albums]: FavoriteAlbums,
  [ETabs.audiobooks]: FavoriteBooks,
};

/**
 * Блок с тремя вкладками избранного: треки, альбомы, книги
 */
export const Favorite = () => {
  const [selectedTab, setSelectedTab] = useState<ETabs>(ETabs.tracks);
  const Content = useMemo(() => TABS_CONTENT[selectedTab], [selectedTab]);

  const onChangeSelectedTab = useCallback((value: ETabs) => {
    setSelectedTab(value);
  }, []);

  return (
    <div>
      <Typography.Title level={2}>Ваше любимое</Typography.Title>
      <Segmented
        options={Object.values(ETabs)}
        onChange={onChangeSelectedTab}
      />
      <div className="mt-2">
        <Content />
      </div>
    </div>
  );
};
