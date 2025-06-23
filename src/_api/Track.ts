import { instance } from "./instance";

const IDS_SEPARATE = "%2C";

export class Track {
  static async checkSaved(ids: string[]): Promise<boolean[]> {
    const urlIds = ids.join(IDS_SEPARATE);

    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${urlIds}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }

  static async addToFavorite(ids: string[]): Promise<void> {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/tracks`,
        { ids }
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async removeFromFavorites(ids: string[]): Promise<void> {
    const urlIds = ids.join(IDS_SEPARATE);

    try {
      const response = await instance.delete(
        `https://api.spotify.com/v1/me/tracks?ids=${urlIds}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getFavorites() {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/me/tracks`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getRelated() {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/artists/0XNKQFs2Ewb3y0VsFUFc5l/related-artists`
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
