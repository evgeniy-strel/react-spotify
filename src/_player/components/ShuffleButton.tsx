import { useCallback, useContext, useEffect, useState } from "react";

import { Player } from "../../api";
import { PlayerContext } from "../context";

import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const ShuffleButton = () => {
  const { data } = useContext(PlayerContext);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isManualChanged, setIsManualChanged] = useState<boolean>(false);

  const toggleShuffle = useCallback(() => {
    setIsShuffle((value) => {
      Player.togglePlaybackShuffle(!value);
      return !value;
    });
    setIsManualChanged(true);
  }, []);

  useEffect(() => {
    if (!isManualChanged) {
      setIsShuffle(data?.shuffle_state);
    }
    setIsManualChanged(false);
  }, [data?.shuffle_state]);

  return (
    <>
      {isShuffle ? (
        <SortDescendingOutlined
          title="Играть по порядку"
          className="text-2xl cursor-pointer"
          onClick={toggleShuffle}
        />
      ) : (
        <SortAscendingOutlined
          title="Играть в случайном порядке"
          className="text-2xl cursor-pointer"
          onClick={toggleShuffle}
        />
      )}
    </>
  );
};

export default ShuffleButton;
