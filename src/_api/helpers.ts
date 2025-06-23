import { instance } from "./instance";

export async function getTrack(id: string): Promise<any> {
  try {
    const response = await instance.get(
      `https://api.spotify.com/v1/tracks/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getSavedTracks(): Promise<any> {
  try {
    const response = await instance.get("https://api.spotify.com/v1/me/tracks");
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function searchTracks(): Promise<any> {
  try {
    const response = await instance.get(
      "https://api.spotify.com/v1/search?q=" + "Taylor" + "&type=artist"
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function getProfile() {
  const response = await fetch("https://api.spotify.com/v1/me");

  const data = await response.json();
}

export async function getRecentlyPlayedTracks(): Promise<any> {
  try {
    const response = await instance.get(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function downloadTrack(): Promise<any> {
  try {
    const response = await instance.post(
      `https://spotymp3.app/api/download-track`,
      { url: "https://open.spotify.com/track/2m3PVx1gsVB5upxi94IW8I" },
      {}
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
        "sec-ch-ua":
          '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
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
