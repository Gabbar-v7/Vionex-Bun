import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import Navbar from "@/components/layout/navbar"

const meta = {
    component: Navbar
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}