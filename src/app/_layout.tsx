import { useEffect } from 'react'
import { Platform } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { Stack } from 'expo-router'

import { ThemeProvider } from '@/providers/ThemeProvider'

export default function RootLayout() {
  useEffect(() => {
    setTimeout(async () => {
      await BootSplash.hide({ fade: true })
    }, 1000)
  }, [])

  return (
    <KeyboardProvider>
      <ThemeProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShadowVisible: false,
            headerTransparent: true,
            ...(+Platform.Version <= 18 && { headerBlurEffect: 'regular' }),
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="form" options={{ title: 'Form' }} />
        </Stack>
      </ThemeProvider>
    </KeyboardProvider>
  )
}
