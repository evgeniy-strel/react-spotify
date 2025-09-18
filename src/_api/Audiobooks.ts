import { instance } from "./instance";

export class Audiobooks {
  static async getFavorites() {
    try {
      const response = await instance.get(`/me/audiobooks`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
