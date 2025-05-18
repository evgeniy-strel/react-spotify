import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "./consts";

export async function getAccessToken(): Promise<any> {
    return "BQBGHPpH_0KTWOQvgdszHnt-duxXgGZ8-JT2Dg5Krt_ej0UQ8gHoXmpxILYuCCrBANxse6eUvnBMJrYU2VLWSwMCJcBH3RTiXOdT0aRcyN_gKQ42Tif8PRf9YtZ8eE9i3rw3d5G4r6CTYiCxklWTBy2KU5AQuG9nJxixOs5-E_FDYauZgbcrbyFUyO7wADi_oq8LH9ndKAtG6fvV8eztAsx2eeeJrKUhlFy0Dxz0t-QhGgqgmWPbYdn4uG7wDfrDaRMqyogHnb-DIyQ5y9EleTYMNgBa4ZsYOcl2UahU1IAxJ0_TFZWD6-1VZpBwNfuHajfJAJHSOWcmeQaKJ_ooX9vFYKUaj8CyYjrcuueeyzeGY9xz0jGXhXsZpw";
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        return response.data.access_token;
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function getTrack(accessToken: string, id: string): Promise<any> {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        return response.data;
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function getSavedTracks(accessToken: string): Promise<any> {
    try {
        const response = await axios.get("https://api.spotify.com/v1/me/tracks", {
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

export async function searchTracks(accessToken: string): Promise<any> {
    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/search?q=" + "Taylor" + "&type=artist",
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

export async function getProfile(accessToken: string) {
    const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });

    const data = await response.json();
}

export async function getRecentlyPlayedTracks(accessToken: string): Promise<any> {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        });
        return response.data;
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function downloadTrack(): Promise<any> {
    try {
        const response = await axios.post(
            `https://spotymp3.app/api/download-track`,
            { url: "https://open.spotify.com/track/2m3PVx1gsVB5upxi94IW8I" },
            {},
        );
        return response;
    } catch (error: any) {
        console.log(error.message);
    }
}

export async function downloadTrack2(): Promise<any> {
    try {
        const response = await fetch("https://spotymp3.app/api/download-track", {
            headers: {
                accept: "*/*",
                "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/json",
                "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-kl-kfa-ajax-request": "Ajax_Request, Ajax_Request",
            },
            referrer: "https://spotymp3.app/",
            body: '{"url":"https://open.spotify.com/track/2m3PVx1gsVB5upxi94IW8I"}',
            method: "POST",
            mode: "cors",
            credentials: "omit",
        });
        const data = await response.json();
        return data;
    } catch (error: any) {
        console.log(error.message);
    }
}
