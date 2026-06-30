import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import ResetPasswordForm from "@/components/forms/reset-password"

const meta = {
    component: ResetPasswordForm
} satisfies Meta<typeof ResetPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}