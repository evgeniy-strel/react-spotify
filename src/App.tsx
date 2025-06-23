import classes from "./App.module.css";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage, SavedTracksPage, ArtistPage, AlbumPage } from "./pages";
import { ConfigProvider, theme } from "antd";
import { AuthButton, BackButton, ScrollToTop } from "./components";
import { Player } from "./player";

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
          <AuthProvider.Provider
            value={{
              accessToken: localStorage.getItem("access_token") as string,
            }}
          >
            <div
              className={`${classes.PageLayout__root} box-border h-screen overflow-hidden flex flex-col`}
            >
              <div className="h-full overflow-auto py-6">
                <div className="ml-6 mr-6">
                  <BackButton />
                </div>
                <ScrollToTop>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/saved_tracks" element={<SavedTracksPage />} />
                    <Route path="/artist/:id" element={<ArtistPage />} />
                    <Route path="/album/:id" element={<AlbumPage />} />
                  </Routes>
                </ScrollToTop>
              </div>
              <div className="mx">
                <Player />
              </div>
            </div>
            <AuthButton />
          </AuthProvider.Provider>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
