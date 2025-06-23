import axios from "axios";
import { instance } from "./instance";
import { Track } from "./Track";

export class Artists {
  static async getArtist(id: string) {
    try {
      const response = await instance.get(`artists/${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getTopTracks(id: string) {
    try {
      const { data } = await instance.get(`/artists/${id}/top-tracks`);
      const ids = data.tracks.map((track: any) => track.id);
      const saved = await Track.checkSaved(ids);
      data.tracks.forEach((track: any, index: number) => {
        track.is_favorite = saved[index];
      });
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getAlbums(artistId: string) {
    try {
      const response = await instance.get(
        `/artists/${artistId}/albums?include_groups=album`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getSingles(artistId: string) {
    try {
      const response = await instance.get(
        `/artists/${artistId}/albums?include_groups=single`
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
