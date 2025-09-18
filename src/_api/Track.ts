import { instance } from "./instance";

const IDS_SEPARATE = "%2C";

export class Track {
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
      const response = await instance.get(`/me/tracks`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
