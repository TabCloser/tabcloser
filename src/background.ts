import { getPlugins, matchUrl, setIntervalWithTimeout } from './functions'

async function closeTab(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  _tab: chrome.tabs.Tab
) {
  if (changeInfo.url) {
    const plugins = await getPlugins()
    const plugin = matchUrl(changeInfo.url, plugins)
    if (!!plugin && plugin.toggles['enabled']) {
      console.info('[TabCloser] Found match with:', plugin?.name)
      if (plugin.toggles.timeout) {
        console.info(
          '[TabCloser] timeout:',
          plugin.toggles.timeout.value as number,
          plugin.toggles.timeout.sliderUnits
        )
        setIntervalWithTimeout(
          1000,
          (plugin.toggles.timeout.value as number) * 1000,
          undefined,
          async () => {
            await chrome.tabs.remove(tabId),
              console.info('[TabCloser] Removed tab:', tabId)
          }
        )
      } else {
        chrome.tabs.remove(tabId)
        console.info('[TabCloser] Removed tab:', tabId)
      }
    }
  }
}

chrome.tabs.onUpdated.addListener(closeTab)
