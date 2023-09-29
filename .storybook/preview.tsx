import type { Preview } from "@storybook/react";
import React from "react";
import { withRouter } from "storybook-addon-react-router-v6";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: "fullscreen",
    reactRouter: {
      initialEntries: ["/"],
      initialIndex: 0,
      storybookBasePath: "/",
    }
  },
  decorators: [
    withRouter,
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ]
};

export default preview;
