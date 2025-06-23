import React from "react";

interface IContext {
  data: Record<string, any> | null;
  refreshData: () => Promise<any>;
}

export const PlayerContext = React.createContext<IContext>({
  data: null,
  refreshData: () => Promise.resolve(),
});
