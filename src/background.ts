import { getPlugins, matchUrl, setIntervalWithTimeout } from './functions'

async function closeTab(
  tabId: number,
  changeInfo: chrome.tabs.TabChangeInfo,
  _tab: chrome.tabs.Tab
) {
  if (changeInfo.url) {
    const plugin = matchUrl(changeInfo.url, await getPlugins())
    console.log(plugin)
    if (!!plugin && plugin.toggles['enabled']) {
      if (plugin.timeout) {
        const window = await chrome.windows.create({
          url: chrome.runtime.getURL('timeout.html'),
          type: 'popup'
        })
        setIntervalWithTimeout(1000, plugin.timeout, undefined, () => {
          chrome.tabs.remove(tabId), chrome.windows.remove(window.id!)
        })
      } else {
        chrome.tabs.remove(tabId)
      }
    }
  }
}

chrome.tabs.onUpdated.addListener(closeTab)
