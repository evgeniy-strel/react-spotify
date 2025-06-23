import { Favorite, FollowedArtists, RecentlyPlayed } from "../../components";
import { NewReleases } from "./NewReleases/NewReleases";

const HomePage = () => {
  return (
    <div className="ml-6 mr-6 flex flex-col gap-6">
      <RecentlyPlayed />
      <FollowedArtists />
      <Favorite />
      <NewReleases />
    </div>
  );
};

export default HomePage;
