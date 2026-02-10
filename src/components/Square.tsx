import { FC } from 'react'
import { StyleSheet } from 'react-native-unistyles'

import { ThemedView, ThemedViewProps } from '@/components/ThemedView'

type Props = ThemedViewProps & {
  size: number
}

export const Square: FC<Props> = ({ style, children, size, ...rest }) => {
  return (
    <ThemedView
      style={[styles.square, { width: size, height: size }, style]}
      {...rest}
    >
      {children}
    </ThemedView>
  )
}

const styles = StyleSheet.create(() => ({
  square: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
