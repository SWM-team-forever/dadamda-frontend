import { logEvent } from "@/utility/amplitude";

const chromeExtensionInstallLink = 'https://chrome.google.com/webstore/detail/dadamda/kgaiabolccidmgihificdfaimdlfmcfj?hl=ko';
const BOARD_GUIDE_LINK = 'https://gapyeong.notion.site/DADAMDA-c31a77d5d49f49898d965ee7e705442a?pvs=4';

export function useMoveToChromeExtensionInstallLink() {
    logEvent('chrome_extension_install_link_click');
    location.href = chromeExtensionInstallLink;
}

export function useMoveToBoardGuideLink() {
    logEvent('board_guide_link_click');
    window.open(BOARD_GUIDE_LINK, '_blank');
}
