import { instance } from "./instance";

const IDS_SEPARATE = "%2C";

export class Audiobooks {
  static async checkSaved(ids: string[]): Promise<boolean[]> {
    const urlIds = ids.join(IDS_SEPARATE);

    try {
      const response = await instance.get(`/me/tracks/contains?ids=${urlIds}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }

  static async getCurrentlyPlaying() {
    try {
      const response = await instance.get(`/me/player/currently-playing`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async addToFavorite(ids: string[]): Promise<void> {
    try {
      const response = await instance.put(`/me/tracks`, { ids });
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async removeFromFavorites(ids: string[]): Promise<void> {
    const urlIds = ids.join(IDS_SEPARATE);

    try {
      const response = await instance.delete(`/me/tracks?ids=${urlIds}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getFavorites() {
    try {
      const response = await instance.get(`/me/audiobooks`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getAlbums(id: string) {
    try {
      const response = await instance.get(`/artists/${id}/albums`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getAlbumTracks(id: string) {
    try {
      const response = await instance.get(`/albums/${id}/tracks`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
