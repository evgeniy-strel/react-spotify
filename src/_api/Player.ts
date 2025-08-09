import { ERepeatMode } from "../utils";
import { Track } from "./Track";
import { instance } from "./instance";

export class Player {
  static async getState() {
    try {
      const response = await instance.get(
        `https://api.spotify.com/v1/me/player`
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

  static async pausePlayback() {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/player/pause`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async skipToNext() {
    try {
      const response = await instance.post(
        `https://api.spotify.com/v1/me/player/next`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async skipToPrevious() {
    try {
      const response = await instance.post(
        `https://api.spotify.com/v1/me/player/next`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async resumePlayback(params = {}) {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/player/play`,
        params
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async playTrack({ ids, uri }: { ids?: string[]; uri?: string }) {
    const PATTERN = "spotify:track:";
    const uris = (uri && [uri]) || ids?.map((id) => `${PATTERN}${id}`);

    try {
      const response = await instance.put("/me/player/play", { uris });
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async playContextUri(uri: string) {
    try {
      const response = await instance.put("/me/player/play", {
        context_uri: uri,
      });
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async seekToPosition(ms: number) {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${ms}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async setVolume(value: number) {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${value}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async setRepeatMode(state: ERepeatMode) {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/player/repeat?state=${state}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async togglePlaybackShuffle(value: boolean) {
    try {
      const response = await instance.put(
        `https://api.spotify.com/v1/me/player/shuffle?state=${value}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getRecentlyPlayed() {
    try {
      const response = await instance.get(`/me/player/recently-played`);
      const data = response.data;
      const ids = data.items.map((item: any) => item.track.id);
      const saved = await Track.checkSaved(ids);
      data.items.forEach((item: any, index: number) => {
        item.track.is_favorite = saved[index];
      });
      return data;
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
