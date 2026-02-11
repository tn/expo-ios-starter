import { FC } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Link, useRouter } from 'expo-router'

import { Icon } from '@/components/Icon'
import { Square } from '@/components/Square'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { useOnboarding } from '@/hooks/useOnboarding'

export const HomeScreen: FC = () => {
  const router = useRouter()
  const { resetToNone } = useOnboarding()

  return (
    <View style={styles.vStack}>
      <ThemedText size="title3">Expo iOS Starter</ThemedText>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon
            name="point.bottomleft.forward.to.arrow.triangle.scurvepath"
            size={24}
          />
        </Square>
        <ThemedText>Expo Router</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="rectangle.roundedtop.fill" size={24} />
        </Square>
        <ThemedText>Onboarding</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="archivebox" size={24} />
        </Square>
        <ThemedText>MMKV and Jotai</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="paintpalette" size={24} />
        </Square>
        <ThemedText>Unistyles</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="cube.box" size={24} />
        </Square>
        <ThemedText>Starter Components</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="swatchpalette" size={24} />
        </Square>
        <ThemedText>Token-based theming</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="circle.filled.iphone" size={24} />
        </Square>
        <ThemedText>BootSplash</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="sparkle.magnifyingglass" size={24} />
        </Square>
        <ThemedText>Pre-configured Eslint and Prettier</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="star" size={24} />
        </Square>
        <ThemedText>Expo Symbols (Beta)</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="square.text.square" size={24} />
        </Square>
        <ThemedText>React Hook Form</ThemedText>
      </View>
      <View style={styles.hStack}>
        <Square tone="surface" size={40} radius="medium">
          <Icon name="keyboard" size={24} />
        </Square>
        <ThemedText>Keyboard Controller</ThemedText>
      </View>
      <Link href="/form" asChild>
        <ThemedButton
          label="Go to Form"
          tone="accent"
          radius="full"
          size="small"
        />
      </Link>
      {__DEV__ ? (
        <ThemedButton
          label="Reset Onboarding (DEV)"
          onPress={() => {
            resetToNone()
            router.replace('/onboarding')
          }}
          tone="accentSubtle"
          radius="full"
          size="small"
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create(theme => ({
  vStack: {
    flex: 1,
    gap: theme.spacing.space8,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.space24,
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.space12,
  },
}))
