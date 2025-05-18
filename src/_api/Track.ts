import axios from "axios";

const IDS_SEPARATE = "%2C";

export class Track {
    static async checkSaved(accessToken: string, ids: string[]): Promise<boolean[]> {
        const urlIds = ids.join(IDS_SEPARATE);

        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/me/tracks/contains?ids=${urlIds}`,
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

    static async removeFromFavorites(accessToken: string, ids: string[]): Promise<void> {
        const urlIds = ids.join(IDS_SEPARATE);

        try {
            const response = await axios.delete(
                `https://api.spotify.com/v1/me/tracks?ids=${urlIds}`,
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
