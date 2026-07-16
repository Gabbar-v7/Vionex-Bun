import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SignUpForm from "@/components/forms/signup";

const meta = {
  component: SignUpForm,
} satisfies Meta<typeof SignUpForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
