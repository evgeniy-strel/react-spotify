export const getNameArtists = (artists: Array<any>): string => {
  return artists.map((artist: any) => artist.name).join(", ");
};
