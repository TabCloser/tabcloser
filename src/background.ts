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
      if (plugin.timeout) {
        const window = await chrome.windows.create({
          url: chrome.runtime.getURL('timeout.html'),
          type: 'popup'
        })
        console.info(
          '[TabCloser] show popup:',
          tabId,
          '; timeout:',
          plugin.timeout
        )
        setIntervalWithTimeout(
          1000,
          plugin.timeout / 1000,
          undefined,
          async () => {
            await chrome.tabs.remove(tabId),
              await chrome.windows.remove(window.id!)
            console.info('[TabCloser] Removed tab:', tabId)
            console.info('[TabCloser] Closed popup:', window.id!)
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
