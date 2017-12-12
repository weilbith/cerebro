import config from './/config' // To get the users settings.

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


export default { applyCustomTheme }
