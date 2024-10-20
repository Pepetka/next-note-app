import { fn } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { AddToDoForm } from "./AddToDoForm";

const meta = {
  title: "components/AddToDoForm",
  component: AddToDoForm,
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
} satisfies Meta<typeof AddToDoForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
