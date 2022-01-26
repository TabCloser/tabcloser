export type TabCloserToggles = { [key: string]: boolean }

export type TabCloserPlugin = {
  name: string
  /** URL pattern to match */
  regex: string[]
  /** Timeout, in milliseconds */
  timeout?: number
  /**  */
  toggles: TabCloserToggles
}

export type TabCloserPlugins = {
  [key: string]: TabCloserPlugin
}

export const DEFAULT_TOGGLES: TabCloserToggles = {
  enabled: true
}

export const DEFAULT_PLUGINS: TabCloserPlugins = {
  figma: {
    name: 'Figma',
    regex: [
      '^((http[s]?):/)?/?((/w+)*)(.*)(www.figma.com)/(file|app_auth)((/w+)*/)(.*)/'
    ],
    toggles: { ...DEFAULT_TOGGLES },
    timeout: 5000
  },
  spotify: {
    name: 'Spotify',
    regex: ['^((http[s]?):/)?/?((/w+)*)(.*)(open.spotify.com)((/w+)*/)(.*)/'],
    toggles: DEFAULT_TOGGLES,
    timeout: 5000
  },
  vscode: {
    name: 'Visual Studio Code',
    regex: [
      '^((http[s]?):/)?/?((/w+)*)(.*)(prod.liveshare.vsengsaas.visualstudio.com)((/w+)*/)(.*)/'
    ],
    toggles: DEFAULT_TOGGLES,
    timeout: 5000
  },
  zoom: {
    name: 'Zoom',
    regex: [
      '^((http[s]?):/)?/?((/w+)*)(.*)(zoom.us)((/w+)*/)(.*)?(status=|#)success$'
    ],
    toggles: DEFAULT_TOGGLES,
    timeout: 5000
  },
  custom: {
    name: 'Custom',
    regex: [],
    toggles: DEFAULT_TOGGLES,
    timeout: 5000
  }
}
