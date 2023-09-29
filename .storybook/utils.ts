import { fontUrl } from "../src/assets/styles/globalStorybook";

const fontLinkId = 'storybook-font-link-tag';

export const loadFontsForStorybook = () => {
  if (!document.getElementById(fontLinkId)) {
    const fontLink = document.createElement('link');

    fontLink.id = fontLinkId;
    fontLink.href = fontUrl;
    fontLink.rel = 'stylesheet';

    document.head.appendChild(fontLink);
  }
};
