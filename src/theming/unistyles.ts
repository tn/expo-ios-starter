import { StyleSheet } from 'react-native-unistyles'

import { Themes, themes } from './themes'

const settings = {
  adaptiveThemes: true,
}

StyleSheet.configure({
  themes,
  settings,
})

declare module 'react-native-unistyles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface UnistylesThemes extends Themes {}
}
