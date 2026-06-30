import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppNavbar from "../../layout/app-navbar";
import { Bookmark, Home, Search, } from "lucide-react";

const meta = {
    component: AppNavbar
} satisfies Meta<typeof AppNavbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        navItems: [
            { label: "Home", href: "/", icon: <Home /> },
            { label: "Search", href: "#", icon: <Search /> },
            { label: "Whishlist", href: "#", icon: <Bookmark /> },
        ]
    }
}