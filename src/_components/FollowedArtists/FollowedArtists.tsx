import React, { useContext, useEffect, useState } from "react";

import { AuthProvider } from "../../contexts/AuthProvider";
import { Users } from "../../api";
import classes from "./FollowedArtists.module.css";

import { Typography } from "antd";

export const FollowedArtists = () => {
    const { accessToken } = useContext(AuthProvider);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        if (accessToken) {
            Users.getFollowedArtists(accessToken).then(setData);
        }
    }, [accessToken]);

    return (
        <div>
            <Typography.Title level={2}>Вы подписаны</Typography.Title>
            <div
                className={`w-full overflow-auto flex overflow-auto gap-x-8 gap-y-3 hide-scrollbar`}>
                {data?.artists?.items.map((item: any, index: number) => (
                    <FollowedArtist key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export const FollowedArtist = ({ item }: any) => {
    return (
        <div className="flex flex-col gap-2 items-center shrink-0">
            <img className={classes.img} src={item.images.at(0).url} />
            <Typography.Text strong={true}>{item.name}</Typography.Text>
        </div>
    );
};
