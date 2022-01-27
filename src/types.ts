declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
  }
}

export type TabCloserSliderUnits = 'seconds'

/** Supported TabCloser controls in TabPanel */
export type TabCloserControl = 'switch' | 'slider'

export type TabCloserToggle = {
  /** Whether the toggle is actually toggled */
  value: boolean | number
  /** Corresponding control to the toggle, to be rendered in TabPanel */
  control: TabCloserControl
  /** Diplay text of the toggle */
  text: string

  sliderUnits?: TabCloserSliderUnits
}

export type TabCloserToggles = { [key: string]: TabCloserToggle }

export type TabCloserPlugin = {
  name: string
  /** URL pattern to match */
  regex: string[]
  /**  */
  toggles: TabCloserToggles
}

export type TabCloserPlugins = {
  [key: string]: TabCloserPlugin
}

export const DEFAULT_TOGGLES: TabCloserToggles = {
  enabled: {
    value: true,
    control: 'switch',
    text: 'Automatically close %%PLUGIN_NAME%% tabs'
  },
  timeout: {
    value: 5,
    control: 'slider',
    text: 'Auto-close duration for %%PLUGIN_NAME%% tabs is',
    sliderUnits: 'seconds'
  }
}

export const DEFAULT_PLUGINS: TabCloserPlugins = {
  figma: {
    name: 'Figma',
    regex: [
      '^((http[s]?):/)?/?((/w+)*)(.*)(www.figma.com)/(file|app_auth)((/w+)*/)(.*)/'
    ],
    toggles: { ...DEFAULT_TOGGLES }
  },
  spotify: {
    name: 'Spotify',
    regex: ['^((http[s]?):/)?/?((/w+)*)(.*)(open.spotify.com)((/w+)*/)(.*)/'],
    toggles: DEFAULT_TOGGLES
  },
  vscode: {
    name: 'Visual Studio Code',
    regex: [
      '^((http[s]?):/)?/?((/w+)*)(.*)(prod.liveshare.vsengsaas.visualstudio.com)((/w+)*/)(.*)/'
    ],
    toggles: DEFAULT_TOGGLES
  },
  zoom: {
    name: 'Zoom',
    regex: [
      '^((http[s]?):/)?/?((/w+)*)(.*)(zoom.us)((/w+)*/)(.*)?(status=|#)success$'
    ],
    toggles: DEFAULT_TOGGLES
  },
  custom: {
    name: 'Custom',
    regex: [],
    toggles: DEFAULT_TOGGLES
  }
}
