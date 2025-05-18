import React, { useContext, useEffect, useState } from "react";
import { getSavedTracks, ERoutes } from "../api";
import { AuthProvider } from "../contexts/AuthProvider";
import { Skeleton } from "antd";
import { useNavigate } from "react-router";

const SavedTracks = () => {
    const { accessToken } = useContext(AuthProvider);
    const [items, setItems] = useState<any>();

    useEffect(() => {
        if (accessToken) {
            getSavedTracks(accessToken).then((data) => {
                if (data) {
                    console.log(data);
                    setItems(data.items);
                }
            });
        }
    }, [accessToken]);

    return (
        <div>
            <h2>Любимые треки</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {items &&
                    items.map((item: any) => {
                        const { track } = item;
                        return <Track track={track} />;
                    })}
            </div>
        </div>
    );
};

const Track = (props: any) => {
    const { track } = props;
    const navigate = useNavigate();

    const openArtistPage = (artist: any) => {
        const artistId = track.artists?.at(0).id;

        navigate(`${ERoutes.Artist}/${artistId}`);
    };

    return (
        <div>
            {/* <Skeleton.Image active={true} style={{ width: 300, height: 300 }} /> */}
            <img src={track.album.images?.at(0).url} alt="" width={300} height={300} />
            <div>{track.name}</div>
            <div style={{ color: "gray" }} onClick={openArtistPage}>
                {track.artists?.at(0).name}
            </div>
        </div>
    );
};

export default SavedTracks;
