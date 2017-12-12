import React, { PropTypes, Component } from 'react'
import Hotkey from './Hotkey'
import countries from './countries'
import { Select, Checkbox, Wrapper, Text } from 'cerebro-ui/Form'
import loadThemes from 'lib/loadThemes'
import styles from './styles.css'
import themizer from 'lib/themizer'

class Settings extends Component {
  constructor(props) {
    super(props)
    const { get } = this.props
    this.state = {
      hotkey: get('hotkey'),
      showInTray: get('showInTray'),
      country: get('country'),
      theme: get('theme'),
      developerMode: get('developerMode'),
      cleanOnHide: get('cleanOnHide'),
      pluginsSettings: get('plugins'),
      trackingEnabled: get('trackingEnabled'),
      crashreportingEnabled: get('crashreportingEnabled'),
      openAtLogin: get('openAtLogin'),
      customTheme: get('customTheme'),
      customTheme_bgColor: get('customTheme_bgColor')
    }
    this.changeConfig = this.changeConfig.bind(this)
    this.changeThemeConfig = this.changeThemeConfig.bind(this)
    this.applyTheme = themizer.applyCustomTheme
  }
  changeConfig(key, value) {
    this.props.set(key, value)
    this.setState({
      [key]: value
    })
  }
  changeThemeConfig(key, value) {
    this.changeConfig(key, value) // Update the configuration as any other value also.
      themizer.applyCustomTheme() // Apply the new configuration that influence the theme.
  }
  render() {
    const {
      hotkey, showInTray, country, theme, developerMode, cleanOnHide, customTheme, customTheme_bgColor, openAtLogin,
      trackingEnabled, crashreportingEnabled
    } = this.state

    return (
      <div className={styles.settings}>
        <Wrapper label="Hotkey" description="Type your global shortcut for Cerebro in this input">
          <Hotkey
            hotkey={hotkey}
            onChange={(key) => this.changeConfig('hotkey', key)}
          />
        </Wrapper>
        <Select
          label="Country"
          description="Choose your country so Cerebro can better choose currency, language, etc."
          value={country}
          options={countries}
          onChange={value => this.changeConfig('country', value)}
        />
        <Select
          label="Theme"
          value={theme}
          options={loadThemes()}
          onChange={value => this.changeConfig('theme', value)}
        />
        <Checkbox
          label="Custom Theme"
          value={customTheme}
          onChange={value => this.changeConfig('customTheme', value)}
        />
        <Text
          label="Background Color"
          value={customTheme_bgColor}
          onChange={value => this.changeThemeConfig('customTheme_bgColor', value)}
        />
        <Checkbox
          label="Open at login"
          value={openAtLogin}
          onChange={value => this.changeConfig('openAtLogin', value)}
        />
        <Checkbox
          label="Show in menu bar"
          value={showInTray}
          onChange={value => this.changeConfig('showInTray', value)}
        />
        <Checkbox
          label="Developer Mode"
          value={developerMode}
          onChange={value => this.changeConfig('developerMode', value)}
        />
        <Checkbox
          label="Clean results on hide"
          value={cleanOnHide}
          onChange={value => this.changeConfig('cleanOnHide', value)}
        />
        <Checkbox
          label="Send anonymous statistics (requires restart)"
          value={trackingEnabled}
          onChange={value => this.changeConfig('trackingEnabled', value)}
        />
        <Checkbox
          label="Send automatic crash reports (requires restart)"
          value={crashreportingEnabled}
          onChange={value => this.changeConfig('crashreportingEnabled', value)}
        />
      </div>
    )
  }
}

Settings.propTypes = {
  get: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired
}

export default Settings
