import { useCallback, useContext, memo } from "react";
import { Player } from "../../api";

import { Button } from "antd";
import { CaretRightOutlined, PauseOutlined } from "@ant-design/icons";
import { PlayerContext } from "../../player";

interface IProps {
  isLoading: boolean;
  isPlaying: boolean;
  playCallback: Function;
}

/**
 * Кнопка "Слушать" для проигрывания по артисту/альбому
 */

const PlayButton = (props: IProps) => {
  const { isLoading, isPlaying, playCallback } = props;
  const { refreshData } = useContext(PlayerContext);

  const Icon = isPlaying ? PauseOutlined : CaretRightOutlined;

  const onClick = useCallback(async () => {
    if (isPlaying) {
      await Player.pausePlayback();
    } else {
      playCallback();
    }
    // Задержка нужна тк спотифай не успевает обновить данные
    setTimeout(refreshData, 250);
  }, [isPlaying, playCallback, refreshData]);

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

export default memo(PlayButton);
