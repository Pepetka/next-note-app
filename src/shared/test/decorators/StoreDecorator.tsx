import { ComponentProps, useLayoutEffect } from "react";
import type { Decorator } from "@storybook/react";
import { StoreProvider } from "@/shared/providers";

export const getStoreDecorator =
  (
    initialState: ComponentProps<typeof StoreProvider>["initialState"],
    effect?: () => void,
  ): Decorator =>
  // eslint-disable-next-line react/display-name
  (Story) => {
    useLayoutEffect(() => {
      effect?.();
    }, []);

    return (
      <StoreProvider initialState={initialState}>
        <Story />
      </StoreProvider>
    );
  };
