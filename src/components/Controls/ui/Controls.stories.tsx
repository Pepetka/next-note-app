import type { Meta, StoryObj } from "@storybook/react";
import { Controls } from "./Controls";

const meta = {
  title: "components/Controls",
  component: Controls,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    filter: {
      control: "select",
      description: "Selected filter",
      options: ["all", "active", "finished"],
    },
  },
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filter: "all",
  },
};
