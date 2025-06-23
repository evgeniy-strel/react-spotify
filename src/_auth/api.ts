import axios, { AxiosResponse } from "axios";
import { REDIRECT_URL } from "./consts";
import { getCodeChallenge, getRefreshToken } from "./helpers";
import { ALL_SCOPES } from "./scopes";

const AUTH_URL = "https://accounts.spotify.com/api/token";

export async function fetchAccessToken(code: string): Promise<any> {
  try {
    const response = await axios.post(
      AUTH_URL,
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URL,
        code_verifier: localStorage.getItem("code_verifier"),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      alert("Вы успешно авторизированы");
      window.location.href = "/";
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function refreshToken(): Promise<
  AxiosResponse<any, any> | undefined
> {
  try {
    const response = await axios.post(
      AUTH_URL,
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        grant_type: "refresh_token",
        refresh_token: getRefreshToken(),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    if (response.status === 200) {
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
      localStorage.setItem("access_token", accessToken);
    }
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
}

const authUrl = new URL("https://accounts.spotify.com/authorize");

export async function openLoginPage(): Promise<void> {
  try {
    const codeChallenge = await getCodeChallenge();
    const params: any = {
      response_type: "code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: ALL_SCOPES,
      redirect_uri: REDIRECT_URL,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.open(authUrl.toString());
  } catch (error: any) {
    console.log(error.message);
  }
}
