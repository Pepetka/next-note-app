import type { Meta, StoryObj } from "@storybook/react";
import {
  getStoreDecorator,
  getStyleContainerDecorator,
  LocalStorageDecorator,
} from "@/shared/test";
import { ToDosLS } from "@/shared/lib";
import type { ToDo } from "@/shared/types/ToDo";
import HomePage from "./page";

const meta = {
  title: "app/HomePage",
  component: HomePage,
  parameters: {
    layout: "centered",
  },
  decorators: [
    LocalStorageDecorator,
    getStyleContainerDecorator({ width: "500px", position: "relative" }),
  ],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

const toDos: ToDo[] = [
  { id: "1", title: "To do", checked: false },
  { id: "2", title: "Done", checked: true },
  { id: "3", title: "Doing", checked: false },
];

export const Default: Story = {
  args: {
    searchParams: {
      filter: "all",
    },
  },
  decorators: [getStoreDecorator({ isInitialized: true, toDos }, () => ToDosLS.saveToDos(toDos))],
};

export const Loading: Story = {
  args: {
    searchParams: {
      filter: "all",
    },
  },
};

export const Empty: Story = {
  args: {
    searchParams: {
      filter: "all",
    },
  },
  decorators: [getStoreDecorator({ isInitialized: true, toDos: [] })],
};
