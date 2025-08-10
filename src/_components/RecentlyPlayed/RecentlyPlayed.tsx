import { useEffect, useState } from "react";

import classes from "./RecentlyPlayed.module.css";
import { Player } from "../../api";
import { getAccessToken } from "../../auth";
import { ListTemplate } from "../../itemTemplates";

import { Typography } from "antd";

const COUNT_TRACKS = 16;
const { Title } = Typography;

const RecentlyPlayed = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (accessToken) {
      Player.getRecentlyPlayed().then(setData);
    }
  }, [accessToken]);

  return (
    <div>
      <Title level={2}>Недавно прослушано</Title>
      <div
        className={`${classes.grid} hide-scrollbar w-full overflow-auto gap-x-6 gap-y-3`}
      >
        {data
          ? data?.items
              ?.slice(0, COUNT_TRACKS)
              .map((item: any, index: number) => {
                return (
                  <ListTemplate
                    key={item.track.id + ":" + item.played_at}
                    track={item.track}
                  />
                );
              })
          : new Array(COUNT_TRACKS)
              .fill(0)
              .map((_, index) => <ListTemplate.Skeleton key={index} />)}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
