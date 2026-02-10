import { createContext, FC, PropsWithChildren } from 'react'
import { useColorScheme } from 'react-native'
import {
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native'

import { Theme, themes } from '../theming/themes'

export const ThemeContext = createContext<Theme>(themes.light)

const { Provider } = ThemeContext

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme() as keyof typeof themes

  return (
    <Provider value={themes[colorScheme]}>
      <NavigationThemeProvider
        value={{
          ...DefaultTheme,
          dark: colorScheme === 'dark',
          colors: {
            ...DefaultTheme.colors,
            primary: themes[colorScheme].colors.background.brand,
            background: themes[colorScheme].colors.background.page,
            card: themes[colorScheme].colors.background.page,
            text: themes[colorScheme].colors.foreground.text,
            border: themes[colorScheme].colors.background.surfaceSecondary,
            notification: themes[colorScheme].colors.background.brand,
          },
        }}
      >
        {children}
      </NavigationThemeProvider>
    </Provider>
  )
}
