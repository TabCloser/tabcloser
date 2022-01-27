import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Slider,
  Switch,
  Tab,
  TextField,
  ThemeProvider
} from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { getPlugins, setToggleValue } from './functions'
import { TabCloserPlugins } from './types'
import { THEME } from './theme'

export default function Popup() {
  const [currentTabIndex, setCurrentTabIndex] = useState('1')
  const [plugins, setPlugins] = useState<TabCloserPlugins>({})

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTabIndex(newValue)
  }

  useEffect(() => {
    getPluginsFromStorage()
  })

  const getPluginsFromStorage = async () => {
    const plugins = await getPlugins()
    Object.keys(plugins).forEach((plugin) =>
      Object.keys(plugins[plugin].toggles).forEach(
        (toggle) =>
          (plugins[plugin].toggles[toggle].text = plugins[plugin].toggles[
            toggle
          ].text.replace('%%PLUGIN_NAME%%', plugins[plugin].name))
      )
    )
    setPlugins(plugins)
  }

  const tabs = Object.keys(plugins).reduceRight((accum, plugin, index) => {
    const tab = (
      <Tab
        key={index.toString()}
        label={plugins[plugin].name}
        value={index.toString()}
      />
    )
    return [...accum, tab]
  }, [] as JSX.Element[])

  const sliderAriaValueText = (value: number) => {
    return `${value}`
  }

  const savePlugin = (plugin: string, toggleChanges) => {}

  const tabPanels = Object.keys(plugins).reduceRight((accum, plugin, index) => {
    const controls = Object.keys(plugins[plugin].toggles).map((toggleName) => {
      const toggle = plugins[plugin].toggles[toggleName]
      switch (toggle.control) {
        case 'slider': {
          return (
            <FormControlLabel
              key={toggleName + '-label'}
              control={
                <Slider
                  aria-label={toggle.text}
                  defaultValue={toggle.value as number}
                  getAriaValueText={sliderAriaValueText}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={0}
                  max={10}
                />
              }
              label={
                <span>
                  {toggle.text}{' '}
                  <TextField
                    id={toggle + '-label'}
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    defaultValue={toggle.value as number}
                  />{' '}
                  {toggle.sliderUnits}
                </span>
              }
            />
          )
        }
        case 'switch': {
          return (
            <FormControlLabel
              key={toggleName + '-label'}
              control={<Switch defaultChecked={toggle.value as boolean} />}
              label={toggle.text}
              aria-label={toggle.text}
            />
          )
        }
      }
    })
    const tabPanel = (
      <TabPanel key={index.toString()} value={index.toString()}>
        Options for {plugins[plugin].name}
        <FormGroup>{controls}</FormGroup>
        <Button variant="contained" onClick={() => savePlugin(plugin, {})}>
          Save
        </Button>
      </TabPanel>
    )
    return [...accum, tabPanel]
  }, [] as JSX.Element[])

  return (
    <ThemeProvider theme={THEME}>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={currentTabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleTabChange}
              aria-label="TabCloser options tab"
            >
              {tabs}
            </TabList>
          </Box>
          {tabPanels}
        </TabContext>
      </Box>
    </ThemeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root')
)
