// icons.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Google, Facebook, GitHub } from "@/components/icons";

const meta = {
    title: "Components/Icons",
    parameters: {
        layout: "centered",
    },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const GoogleIcon: Story = {
    render: () => <Google width={ 48} height = { 48} />,
};

export const FacebookIcon: Story = {
    render: () => <Facebook width={ 48} height = { 48} />,
};

export const GitHubIcon: Story = {
    render: () => <GitHub width={ 48} height = { 48} />,
};