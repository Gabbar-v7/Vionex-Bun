import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Logo from "@/components/logo";

const meta = {
  component: Logo,
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
