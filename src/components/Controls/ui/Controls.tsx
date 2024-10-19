import Link from "next/link";
import { classnames } from "@/shared/lib";
import styles from "./Controls.module.css";

const CONTROLS = ["All", "Active", "Finished"];

interface ControlsProps {
  filter: "all" | "active" | "finished" | null;
}

export const Controls = (props: ControlsProps) => {
  const { filter = "all" } = props;

  return (
    <div className={styles.controlsWrapper} data-testid="Controls">
      {CONTROLS.map((control) => (
        <Link
          key={control}
          href={{ query: { filter: control.toLowerCase() } }}
          className={styles.link}
        >
          <button
            className={classnames(styles.button, {
              [styles.active]: control.toLowerCase() === filter,
            })}
            data-testid={`Controls__${control.toLowerCase()}-button`}
            tabIndex={-1}
          >
            {control}
          </button>
        </Link>
      ))}
    </div>
  );
};
