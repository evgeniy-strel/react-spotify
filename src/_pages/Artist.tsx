import React, { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../contexts/AuthProvider";
import { Artists, Player, Playlist, Track } from "../api";
import { useParams } from "react-router";

const ARTIST_ID = "0XNKQFs2Ewb3y0VsFUFc5l";

const Artist = () => {
    const { accessToken } = useContext(AuthProvider);
    let { id } = useParams();
    const [info, setInfo] = useState<any>();
    const [topTracks, setTopTracks] = useState<any>();
    const [albums, setAlbums] = useState<any>();

    useEffect(() => {
        if (accessToken) {
            const artistId = id || ARTIST_ID;
            Artists.getArtist(accessToken, artistId).then((info) => {
                if (info) {
                    setInfo(info);
                }
            });
            Artists.getTopTracks(accessToken, artistId).then((info) => {
                if (info) {
                    setTopTracks(info.tracks);
                }
            });
            Artists.getAlbums(accessToken, artistId).then((info) => {
                if (info) {
                    setAlbums(info);
                }
            });
            Player.getState(accessToken);
            Player.getCurrentlyPlaying(accessToken);
            Playlist.getPlaylist(accessToken);
        }
    }, [accessToken]);

    const onAlbumClick = (item: any) => {
        Artists.getAlbumTracks(accessToken, item.id).then((info) => {
            if (info) {
                console.log(info);
                setTopTracks(info.items);
            }
        });
    };

    if (!info || !topTracks || !albums) {
        return <></>;
    }

    return (
        <div>
            <img src={info.images?.at(0).url} width={400} />
            <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                <h2>{info.name}</h2>
                <div>{info.followers.total} подписаны</div>
            </div>
            <div style={{ display: "flex", gap: 32 }}>
                <TopTracks tracks={topTracks} />
                <Albums items={albums.items} onItemClick={onAlbumClick} />
            </div>
        </div>
    );
};

const TopTracks = ({ tracks }: any) => {
    return (
        <div>
            {tracks.map((track: any) => (
                <TrackItem
                    img={track.album?.images?.at(2).url}
                    title={track.name}
                    artists={track.artists}
                />
            ))}
        </div>
    );
};

const TrackItem = ({ img, title, artists }: any) => {
    return (
        <div style={{ display: "flex", gap: 8 }}>
            <img src={img} width={55} />
            <div>
                <div>{title}</div>
                <div style={{ color: "gray" }}>
                    {artists.map((artist: any) => artist.name).join(", ")}
                </div>
            </div>
        </div>
    );
};

const Albums = ({ items, onItemClick }: any) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {items.map((item: any) => (
                <AlbumItem
                    item={item}
                    img={item.images?.at(1).url}
                    title={item.name}
                    releaseDate={item.release_date}
                    totalTracks={item.total_tracks}
                    onClick={onItemClick}
                />
            ))}
        </div>
    );
};

const AlbumItem = ({ item, img, title, releaseDate, totalTracks, onClick }: any) => {
    return (
        <div style={{ width: 200 }} onClick={() => onClick(item)}>
            <img src={img} width={200} />
            <div>{title}</div>
            <div style={{ display: "flex", gap: 8, color: "gray" }}>
                <div>{totalTracks > 1 ? `${totalTracks} треков` : "Сингл"}</div>
                <div>{releaseDate}</div>
            </div>
        </div>
    );
};

export default Artist;
