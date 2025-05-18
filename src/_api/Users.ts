import axios from "axios";

export class Users {
    static async getFollowedArtists(accessToken: string): Promise<any> {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/me/following?type=artist`,
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
            return [];
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

    static async saveTracks(accessToken: string, ids: string[]): Promise<void> {
        try {
            const response = await axios.put(
                `https://api.spotify.com/v1/me/tracks`,
                { ids },
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
