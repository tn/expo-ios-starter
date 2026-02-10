import { FC } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Link } from 'expo-router'

import { Icon } from '@/components/Icon'
import { Square } from '@/components/Square'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedScrollView } from '@/components/ThemedScrollView'
import { ThemedText } from '@/components/ThemedText'

export const HomeScreen: FC = () => {
  return (
    <ThemedScrollView
      contentInsetAdjustmentBehavior="always"
      withSafeArea={false}
    >
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
            <Icon name="paintpalette" size={24} />
          </Square>
          <ThemedText>Unistyles</ThemedText>
        </View>
        <View style={styles.hStack}>
          <Square tone="surface" size={40} radius="medium">
            <Icon name="swatchpalette" size={24} />
          </Square>
          <ThemedText>Basic theming</ThemedText>
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
            size="medium"
          />
        </Link>
      </View>
    </ThemedScrollView>
  )
}

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.page,
  },
  vStack: {
    gap: theme.spacing.space12,
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.space12,
  },
}))
