import axios from "axios";

export class Artists {
    static async getArtist(accessToken: string, id: string) {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
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

    static async getTopTracks(accessToken: string, id: string) {
        try {
            const response = await axios.get(
                `https://api.spotify.com/v1/artists/${id}/top-tracks`,
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
