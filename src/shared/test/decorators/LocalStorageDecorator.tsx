import { useEffect } from "react";
import type { Decorator } from "@storybook/react";
import { mockLocalStorage } from "@/shared/test";

mockLocalStorage();

export const LocalStorageDecorator: Decorator = (Story) => {
  useEffect(() => {
    return localStorage.clear;
  }, []);

  return <Story />;
};
