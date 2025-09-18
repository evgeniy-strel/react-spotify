import { instance } from "./instance";

export class Users {
  static async getFollowedArtists(): Promise<any> {
    try {
      const response = await instance.get(`/me/following?type=artist`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      return [];
    }
  }

  static async isUserFollowOnArtist(artistIds: string[]) {
    try {
      const response = await instance.get(
        `/me/following/contains?type=artist&ids=${artistIds.join(",")}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async unFollowArtist(artistIds: string[]) {
    try {
      const response = await instance.delete(
        `/me/following?type=artist&ids=${artistIds.join(",")}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async followArtist(artistIds: string[]) {
    try {
      const response = await instance.put(
        `/me/following?type=artist&ids=${artistIds.join(",")}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
