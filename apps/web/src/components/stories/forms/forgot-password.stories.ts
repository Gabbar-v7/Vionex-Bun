import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import ForgotPasswordForm from "@/components/forms/forgot-password";

const meta = { component: ForgotPasswordForm } satisfies Meta<typeof ForgotPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
