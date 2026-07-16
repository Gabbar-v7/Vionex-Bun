import type { Preview } from "@storybook/nextjs-vite";

import { useEffect } from "react";

import "../src/app/globals.css";
import { appFontClasses } from "../src/app/fonts";

const preview: Preview = {
  initialGlobals: {
    backgrounds: {
      grid: true,
    },
  },
  decorators: [
    (Story) => {
      useEffect(() => {
        document.body.classList.add(...appFontClasses.split(" ").filter(Boolean));
      }, []);

      return <Story />;
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
