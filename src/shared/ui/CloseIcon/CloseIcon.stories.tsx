import type { Meta, StoryObj } from "@storybook/react";
import { CloseIcon } from "./CloseIcon";

const meta = {
  title: "shared/ui/CloseIcon",
  component: CloseIcon,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof CloseIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
