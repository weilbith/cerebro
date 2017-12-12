import config from './/config' // To get the users settings.

/**
 * If the user set to use a custom theme, this method apply this.
 * In fact it overwrite the CSS variables, used by the themes, with the color values, defined in the settings by the user.
 */
const applyCustomTheme = () => {
  // Only apply if the user required this in the settings.
  if (config.get('customTheme')) {
    // Overwrite the theme css variables by the settings.

    // Background Color
    const bgColor = config.get('customTheme_bgColor')
    document.documentElement.style.setProperty('--main-background-color', bgColor)

    // Font Color
    const fontColor = config.get('customTheme_fontColor')
    document.documentElement.style.setProperty('--main-font-color', fontColor)
    document.documentElement.style.setProperty('--secondary-font-color', fontColor)
    document.documentElement.style.setProperty('--result-subtitle-color', fontColor)
    document.documentElement.style.setProperty('--selected-result-title-color', fontColor)

    // Border Color
    const borderColor = config.get('customTheme_borderColor')
    document.documentElement.style.setProperty('--main-border', '1px solid ${borderColor}')
    document.documentElement.style.setProperty('--selected-result-background', borderColor)

    // Selection Color
    const selectColor = config.get('customTheme_selectColor')
    document.documentElement.style.setProperty('--selected-result-background', selectColor)

    // Special Color
    const specialColor = config.get('customTheme_specialColor')
    document.documentElement.style.setProperty('--preview-input-background', specialColor)
  }
}


export default { applyCustomTheme }
