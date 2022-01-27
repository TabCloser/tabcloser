import {
  DEFAULT_PLUGINS,
  TabCloserPlugin,
  TabCloserPlugins,
  TabCloserToggles
} from './types'

export async function initPlugin(
  pluginName: string,
  localizedName: string,
  regex: string[],
  toggles: TabCloserToggles
) {
  const plugins = (await chrome.storage.sync.get('plugins')) as TabCloserPlugins
  plugins[pluginName] = {
    name: localizedName,
    regex,
    toggles
  }
}

export async function setToggleValue(
  plugin: string,
  toggle: string,
  value: boolean | number
) {
  await chrome.storage.sync.set({
    [plugin]: {
      toggles: {
        [toggle]: {
          value: value
        }
      }
    }
  })
}

export async function getPlugins() {
  const { plugins } = await chrome.storage.sync.get({
    plugins: DEFAULT_PLUGINS
  })
  return plugins as TabCloserPlugins
}

export async function getPlugin(pluginName: string) {
  return (await getPlugins())[pluginName] as TabCloserPlugin
}

export function matchUrl(
  url: string,
  plugins: TabCloserPlugins
): TabCloserPlugin | undefined {
  let plugin: TabCloserPlugin | undefined = undefined
  Object.keys(plugins).map((pluginName) => {
    if (!plugin) {
      const matchesUrl = plugins[pluginName].regex.reduce((accum, curr) => {
        return accum || new RegExp(curr).test(url)
      }, false)
      if (matchesUrl) plugin = plugins[pluginName]
    }
  })
  return plugin
}

/**
 *
 * @param interval Interval
 * @param executions Number of executions until timeout
 * @param callback Callback to execute each execution until finished.
 * @param finalCallback Callback to execute once finished.
 */
export function setIntervalWithTimeout(
  interval: number,
  executions: number,
  callback?: CallableFunction,
  finalCallback?: CallableFunction
) {
  let counter: number = 0
  const updateTime = () => {
    if (counter === 0) {
      console.info('[TabCloser] began timeout counting')
    }
    if (counter === executions) {
      clearInterval(t)
      if (finalCallback) {
        finalCallback()
      }
    } else {
      console.info('[TabCloser] timeout counted:', counter)
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
  const t = setInterval(() => {
    updateTime()
  }, interval)
}
