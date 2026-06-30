import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import LoginForm from "@/components/forms/login";

const meta = { component: LoginForm } satisfies Meta<typeof LoginForm>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {}