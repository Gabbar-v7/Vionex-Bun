import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import AccountSettingsForm from "@/components/forms/account-settings"

const meta = { component: AccountSettingsForm } satisfies Meta<typeof AccountSettingsForm>

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {}