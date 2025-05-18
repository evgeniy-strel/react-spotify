import axios from "axios";
import { Track } from "./Track";

export class Player {
    static async getState(accessToken: string) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/me/player`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            });
            return response.data;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async getCurrentlyPlaying(accessToken: string) {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/me/player/currently-playing`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async getRecentlyPlayed(accessToken: string) {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/me/player/recently-played`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + accessToken,
                    },
                },
            );
            const data = response.data;
            const ids = data.items.map((item: any) => item.track.id);
            const saved = await Track.checkSaved(accessToken, ids);
            data.items.forEach((item: any, index: number) => {
                item.track.is_favorite = saved[index];
            });
            return data;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async getAlbums(accessToken: string, id: string) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            });
            return response.data;
        } catch (error: any) {
            console.log(error.message);
        }
    }

    static async getAlbumTracks(accessToken: string, id: string) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            });
            return response.data;
        } catch (error: any) {
            console.log(error.message);
        }
    }
}
