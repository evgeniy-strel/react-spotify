import { ERepeatMode } from "../utils";
import { Track } from "./Track";
import { instance } from "./instance";

export class Player {
  static async getState() {
    try {
      const response = await instance.get(`/me/player`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async pausePlayback() {
    try {
      const response = await instance.put(`/me/player/pause`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async skipToNext() {
    try {
      const response = await instance.post(`/me/player/next`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async skipToPrevious() {
    try {
      const response = await instance.post(`/me/player/next`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async resumePlayback(params = {}) {
    try {
      const response = await instance.put(`/me/player/play`, params);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async playTrack({
    ids,
    uri,
    deviceId,
  }: {
    ids?: string[];
    uri?: string;
    deviceId?: string;
  }) {
    const PATTERN = "spotify:track:";
    const uris = (uri && [uri]) || ids?.map((id) => `${PATTERN}${id}`);

    try {
      const url =
        "/me/player/play" + (deviceId ? `?device_id=${deviceId}` : "");
      const response = await instance.put(url, { uris });
      return response.data;
    } catch (error: any) {
      /** Если недавно на устройстве не был активен плеер, то нужно явно указать устройство */
      if (error.status === 404 && !deviceId) {
        const deviceId = await this.getDeviceId();
        if (deviceId) {
          this.playTrack({ ids, uri, deviceId });
        }
      }
    }
  }

  static async playContextUri(uri: string, deviceId?: string) {
    try {
      const url =
        "/me/player/play" + (deviceId ? `?device_id=${deviceId}` : "");
      const response = await instance.put(url, {
        context_uri: uri,
      });
      return response.data;
    } catch (error: any) {
      /** Если недавно на устройстве не был активен плеер, то нужно явно указать устройство */
      if (error.status === 404 && !deviceId) {
        const deviceId = await this.getDeviceId();
        if (deviceId) {
          this.playContextUri(uri, deviceId);
        }
      }
      console.log(error.message);
    }
  }

  static async seekToPosition(ms: number) {
    try {
      const response = await instance.put(`/me/player/seek?position_ms=${ms}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async getDeviceId(): Promise<string | null> {
    try {
      const response = await instance.get(`/me/player/devices`);
      const currentDevice: Record<any, string> | undefined =
        response.data.devices?.at(0);
      if (currentDevice) {
        return currentDevice.id;
      }
    } catch (error: any) {
      console.log(error.message);
    }
    return null;
  }

  static async setVolume(value: number) {
    try {
      const response = await instance.put(
        `/me/player/volume?volume_percent=${value}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async setRepeatMode(state: ERepeatMode) {
    try {
      const response = await instance.put(`/me/player/repeat?state=${state}`);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  static async togglePlaybackShuffle(value: boolean) {
    try {
      const response = await instance.put(`/me/player/shuffle?state=${value}`);
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
}
