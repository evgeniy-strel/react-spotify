import { instance } from "./instance";

export class Playlist {
  static async getFavorites() {
    try {
      const response = await instance.get(`/me/users/`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getPlaylist() {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/playlists/1DU2e0WGLOZj8tcrugo7Iu`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getCurrentlyPlaying() {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/me/player/currently-playing`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getAlbums(id: string) {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/artists/${id}/albums`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getAlbumTracks(id: string) {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/albums/${id}/tracks`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
