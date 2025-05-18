import { AuthButton, Favorite, FollowedArtists, RecentlyPlayed } from "../../components";
import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../contexts/AuthProvider";
import { Player } from "../../api";

const HomePage = () => {
    const { accessToken } = useContext(AuthProvider);
    const [recentlyPlayedData, setRecentlyPlayedData] = useState({});
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (accessToken) {
            Player.getRecentlyPlayed(accessToken)
                .then(setRecentlyPlayedData)
                .catch((error) => setIsError(true));
        }
    }, [accessToken]);

    if (isError || !recentlyPlayedData) {
        return <AuthButton />;
    }

    return (
        <div className="ml-4 mr-4 flex flex-col gap-6">
            <RecentlyPlayed data={recentlyPlayedData} />
            <FollowedArtists />
            <Favorite />
        </div>
    );
};

export default HomePage;
