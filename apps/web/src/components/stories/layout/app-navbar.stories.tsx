import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Bookmark, Home, Search } from "lucide-react";

import AppNavbar from "../../layout/app-navbar";

const meta = {
  component: AppNavbar,
} satisfies Meta<typeof AppNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "jhonedoe@example.com",
      emailVerified: false,
      name: "Jhon Doe",
      image: "https://avatars.githubusercontent.com/u/124599",
    },
    navItems: [
      { label: "Home", href: "/", icon: Home },
      { label: "Search", href: "#", icon: Search },
      { label: "Whishlist", href: "#", icon: Bookmark },
    ],
  },
};
