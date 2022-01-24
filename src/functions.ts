import { TabCloserPlugin, TabCloserPlugins, TabCloserToggles } from './types'

export async function initPlugin(
  pluginName: string,
  localizedName: string,
  regex: RegExp[],
  toggles: TabCloserToggles
) {
  const plugins = (await chrome.storage.sync.get('plugins')) as TabCloserPlugins
  plugins[pluginName] = {
    name: localizedName,
    regex,
    toggles
  }
}

export async function getPlugins() {
  return (await chrome.storage.sync.get('plugins')) as TabCloserPlugins
}

export async function getPlugin(pluginName: string) {
  return (await getPlugins())[pluginName] as TabCloserPlugin
}

export function matchUrl(
  url: string,
  plugins: TabCloserPlugins
): TabCloserPlugin | undefined {
  let plugin: TabCloserPlugin | undefined = undefined
  Object.keys(plugins).map(pluginName => {
    plugin = !!plugin
      ? plugin
      : plugins[pluginName].regex.reduce(
          (accum, curr) => accum && curr.test(url),
          false
        )
      ? plugins[pluginName]
      : undefined
  })
  return plugin
}

/**
 *
 * @param interval Interval
 * @param executions Number of executions until timeout
 * @param callback Callback to execute once finished.
 */
export function setIntervalWithTimeout(
  interval: number,
  executions: number,
  callback?: CallableFunction,
  finalCallback?: CallableFunction
) {
  let counter: number
  const t = setInterval(() => {
    updateTime()
  }, interval)
  const updateTime = () => {
    if (counter === executions) {
      clearInterval(t)
      if (finalCallback) {
        finalCallback()
      }
    } else {
      counter++
      const msg = {
        remainingCountdown: executions - counter
      }
      chrome.storage.local.set(msg)
      chrome.runtime.sendMessage(msg)
      if (callback) {
        callback()
      }
    }
  }
}
