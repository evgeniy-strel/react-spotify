import { useRef } from "react";

import classes from "./App.module.css";
import { HomePage, SavedTracksPage, ArtistPage, AlbumPage } from "./pages";
import { AuthButton, BackButton } from "./components";
import { Player } from "./player";

import { BrowserRouter, Route, Routes } from "react-router";
import { ConfigProvider, theme } from "antd";
import { useScrollToTop } from "./hooks";

export const Content = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useScrollToTop(scrollRef.current);

  return (
    <div className="h-full overflow-auto py-6" ref={scrollRef}>
      <>
        <div className="ml-6 mr-6">
          <BackButton />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/saved_tracks" element={<SavedTracksPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Routes>
      </>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            fontSize: 14,
          },
        }}
      >
        <BrowserRouter>
          <div
            className={`${classes.PageLayout__root} box-border h-screen overflow-hidden flex flex-col`}
          >
            <Content />
            <div className="mx">
              <Player />
            </div>
          </div>
          <AuthButton />
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
