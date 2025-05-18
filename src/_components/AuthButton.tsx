import React from "react";
import { CLIENT_ID } from "../api";
import { ALL_SCOPES } from "../auth";

const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000";

const AuthButton = () => {
    const login = () => {
        window.open(
            `${SPOTIFY_AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${ALL_SCOPES}&response_type=token&show_dialog=true`,
        );
    };

    return (
        <button className="font-bold" onClick={login}>
            Login
        </button>
    );
};

export default AuthButton;
