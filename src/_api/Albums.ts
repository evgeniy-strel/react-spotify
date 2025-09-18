import { instance } from "./instance";

export class Albums {
  static async getFavorites() {
    try {
      const response = await instance.get(`/me/albums`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getAlbum(id: string) {
    try {
      const response = await instance.get(`/albums/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getNewReleases() {
    try {
      const response = await instance.get("/browse/new-releases");
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
