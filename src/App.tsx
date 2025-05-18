import { useEffect, useState, createContext } from "react";
import {
    downloadTrack,
    getAccessToken,
    getProfile,
    getRecentlyPlayedTracks,
    getSavedTracks,
    getTrack,
    ERoutes,
} from "./api";
import { AuthProvider } from "./contexts/AuthProvider";
import { BrowserRouter, NavLink, Route, Routes } from "react-router";
import { HomePage, SavedTracksPage, ArtistPage } from "./pages";
import { ConfigProvider, theme } from "antd";

function getSquarePerimetr(a: number, b: number, c: number, d: number): number {
    return a + b + c + d;
}

function App() {
    const [accessToken, setAccessToken] = useState<string>("");

    const fetchToken = () => {
        getAccessToken().then((token) => {
            setAccessToken(token);
        });
    };

    useEffect(() => {
        fetchToken();
    }, []);

    useEffect(() => {
        if (accessToken) {
        }
    }, [accessToken]);

    return (
        <div className="App">
            <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
                <BrowserRouter>
                    <AuthProvider.Provider value={{ accessToken }}>
                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                margin: "0 auto",
                                width: "fit-content",
                            }}>
                            {Object.values(ERoutes).map((route) => (
                                <NavLink
                                    to={route}
                                    style={{
                                        border: "1px solid blue",
                                        padding: "6px 10px",
                                        borderRadius: 8,
                                        textTransform: "uppercase",
                                        fontWeight: 600,
                                    }}>
                                    {route === "/" ? "Home" : route}
                                </NavLink>
                            ))}
                        </div>

                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/saved_tracks" element={<SavedTracksPage />} />
                            <Route path="/artist/:id" element={<ArtistPage />} />
                            <Route path="/artist/" element={<ArtistPage />} />
                        </Routes>
                    </AuthProvider.Provider>
                </BrowserRouter>
            </ConfigProvider>
        </div>
    );
}

export default App;
