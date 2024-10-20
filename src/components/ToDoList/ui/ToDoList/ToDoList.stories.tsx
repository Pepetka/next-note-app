import type { Meta, StoryObj } from "@storybook/react";
import { getStyleContainerDecorator, LocalStorageDecorator } from "@/shared/test";
import { getStoreDecorator } from "@/shared/test";
import { ToDosLS } from "@/shared/lib";
import type { ToDo } from "@/shared/types/ToDo";
import { ToDoList } from "./ToDoList";

const meta = {
  title: "components/ToDoList/ToDoList",
  component: ToDoList,
  parameters: {
    layout: "centered",
  },
  decorators: [
    LocalStorageDecorator,
    getStyleContainerDecorator({ width: "500px", position: "relative" }),
  ],
  argTypes: {
    filter: {
      control: "select",
      description: "Selected filter",
      options: ["all", "active", "finished"],
    },
  },
} satisfies Meta<typeof ToDoList>;

export default meta;
type Story = StoryObj<typeof meta>;

const toDos: ToDo[] = [
  { id: "1", title: "To do", checked: false },
  { id: "2", title: "Done", checked: true },
  { id: "3", title: "Doing", checked: false },
];

export const Default: Story = {
  args: {
    filter: "all",
  },
  decorators: [
    getStoreDecorator({ isInitialized: true, toDos: [] }, () => ToDosLS.saveToDos(toDos)),
  ],
};

export const Loading: Story = {
  args: {
    filter: "all",
  },
};

export const Empty: Story = {
  args: {
    filter: "all",
  },
  decorators: [getStoreDecorator({ isInitialized: true, toDos: [] })],
};
