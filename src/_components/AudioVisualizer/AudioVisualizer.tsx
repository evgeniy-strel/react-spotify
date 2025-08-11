import classes from "./AudioVisualizer.module.css";

const COUNT = 3;
const ITERATOR = new Array(COUNT).fill(0);
const DEFAULT_COLOR = "white";

interface IProps {
  color?: string;
}

/** Аудио-визуализатор анимации проигрывания музыки (двигающиеся вертикальные полоски) */
export default function AudioVisualizer(props: IProps) {
  const { color = DEFAULT_COLOR } = props;

  return (
    <div className={classes.audioVisualizer}>
      {ITERATOR.map((_: any) => (
        <span style={{ background: color }}></span>
      ))}
    </div>
  );
}
