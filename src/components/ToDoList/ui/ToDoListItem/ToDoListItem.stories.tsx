import type { Meta, StoryObj } from "@storybook/react";
import { getStyleContainerDecorator } from "@/shared/test";
import { ToDoListItem } from "./ToDoListItem";

const meta = {
  title: "components/ToDoList/ToDoListItem",
  component: ToDoListItem,
  parameters: {
    layout: "centered",
  },
  decorators: [getStyleContainerDecorator({ width: "500px", position: "relative" })],
} satisfies Meta<typeof ToDoListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todo: {
      id: "1",
      title: "ToDo List Item",
      checked: false,
    },
    translateY: 0,
    height: 0,
    onDelete: () => {},
    onCheck: () => {},
  },
};

export const Checked: Story = {
  args: {
    todo: {
      id: "1",
      title: "ToDo List Item",
      checked: true,
    },
    translateY: 0,
    height: 0,
    onDelete: () => {},
    onCheck: () => {},
  },
};
