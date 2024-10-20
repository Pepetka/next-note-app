import type { CSSProperties } from "react";
import type { Decorator } from "@storybook/react";

export const getStyleContainerDecorator =
  (style: CSSProperties): Decorator =>
  // eslint-disable-next-line react/display-name
  (Story) => {
    return (
      <div style={style}>
        <Story />
      </div>
    );
  };
