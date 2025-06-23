import { JSX, MouseEventHandler } from "react";
import classes from "./SquareTemplate.module.css";

import { Skeleton, Typography } from "antd";

interface IProps {
  imgSrc: string;
  title: string;
  children: JSX.Element;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

const SquareTemplate = ({ imgSrc, title, children, onClick }: IProps) => {
  const cursorClass = onClick ? "cursor-pointer" : "";
  return (
    <div className="w-[200px] flex flex-col gap-2 shrink-0">
      <img
        className={`${classes.img} ${cursorClass}`}
        src={imgSrc}
        onClick={onClick}
      />
      <Typography.Text
        className={`line-clamp-2 ${cursorClass}`}
        strong={true}
        onClick={onClick}
      >
        {title}
      </Typography.Text>
      {children}
    </div>
  );
};

const ItemSkeleton = () => {
  return (
    <div className="w-[200px] flex flex-col gap-2 shrink-0">
      <Skeleton.Node
        style={{ width: "200px", height: "200px", borderRadius: 16 }}
      />
      <Skeleton.Node style={{ height: "1rem", width: "100%" }} active={true} />
      <Skeleton.Node style={{ height: "1rem", width: "100%" }} active={true} />
    </div>
  );
};

SquareTemplate.Skeleton = ItemSkeleton;

export default SquareTemplate;
