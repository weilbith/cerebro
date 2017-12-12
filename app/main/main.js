import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import initializePlugins from 'lib/initializePlugins'
import { on } from 'lib/rpc'
import { updateTerm } from './actions/search'
import config from '../lib/config'
import store from './store'
import Cerebro from './components/Cerebro'
import './css/global.css'

require('fix-path')()

global.React = React
global.ReactDOM = ReactDOM
global.isBackground = false

/**
 * Change current theme
 *
 * @param  {String} src Absolute path to new theme css file
 */
const changeTheme = (src) => {
  document.getElementById('cerebro-theme').href = src
}

// Set theme from config
changeTheme(config.get('theme'))


/**
 * If the user set to use a custom theme, this method apply this.
 * In fact it overwrite the CSS variables, used by the themes, with the color values, defined in the settings by the user.
 */
const applyCustomTheme = () => {
    // Only apply if the user required this in the settings.
    if (config.get('customTheme')) {
        // Overwrite the theme css variables by the settings.
        document.documentElement.style.setProperty('--main-background-color', config.get('customTheme_bgColor'))
    }
}

// Apply the custom theme if required.
applyCustomTheme()

// Render main container
ReactDOM.render(
  <Provider store={store}>
    <Cerebro />
  </Provider>,
  document.getElementById('root')
)

// Initialize plugins
initializePlugins()

// Handle `showTerm` rpc event and replace search term with payload
on('showTerm', term => store.dispatch(updateTerm(term)))

on('update-downloaded', () => (
  new Notification('Cerebro: update is ready to install', {
    body: 'New version is downloaded and will be automatically installed on quit'
  })
))

// Handle `updateTheme` rpc event and change current theme
on('updateTheme', changeTheme)

// Handle `reload` rpc event and reload window
on('reload', () => location.reload())
