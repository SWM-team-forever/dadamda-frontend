import { logEvent } from "@/utility/amplitude";

const chromeExtensionInstallLink = 'https://chrome.google.com/webstore/detail/dadamda/kgaiabolccidmgihificdfaimdlfmcfj?hl=ko';

export function useMoveToChromeExtensionInstallLink() {
    logEvent('chrome_extension_install_link_click');
    location.href = chromeExtensionInstallLink;
}
