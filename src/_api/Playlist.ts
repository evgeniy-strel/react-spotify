import axios from "axios";

export class Playlist {
    static async getPlaylist(accessToken: string) {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/1DU2e0WGLOZj8tcrugo7Iu`,
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
