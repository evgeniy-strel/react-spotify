export const SCOPES = {
  images: ["ugc-image-upload"],
  spotifyConnect: [
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ],
  playback: ["app-remote-control", "streaming"],
  playlists: [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-modify-public",
  ],
  follow: ["user-follow-modify", "user-follow-read"],
  listeningHistory: [
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
  ],
  library: ["user-library-modify", "user-library-read"],
  users: ["user-read-email", "user-read-private"],
};

export const ALL_SCOPES: string = Object.values(SCOPES)
  .reduce((accum, value) => [...accum, ...value], [])
  .join(" ");
