import { FC } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type Props = TouchableOpacityProps & {
  label?: string
  size?: 'small' | 'medium' | 'large'
  variant?: 'surface' | 'brand' | 'brandSubtle'
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full'
}

export const ThemedButton: FC<Props> = ({
  size = 'medium',
  variant = 'surface',
  radius = 'medium',
  label,
  ...props
}) => {
  styles.useVariants({ size, variant })

  return (
    <TouchableOpacity activeOpacity={0.85} {...props}>
      <ThemedView variant={variant} radius={radius} style={styles.button}>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      </ThemedView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create((theme, rt) => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      size: {
        small: {
          height: theme.sizing[7],
          paddingHorizontal: theme.spacing[3],
          fontSize: theme.fontSizes[3],
        },
        medium: {
          height: theme.sizing[9],
          paddingHorizontal: theme.spacing[4],
          fontSize: theme.fontSizes[4],
        },
        large: {
          height: theme.sizing[10],
          paddingHorizontal: theme.spacing[5],
          fontSize: theme.fontSizes[7],
        },
      },
    },
  },
  label: {
    variants: {
      variant: {
        surface: {
          color: theme.colors.foreground.text,
        },
        brand: {
          color:
            rt.colorScheme === 'light'
              ? theme.colors.foreground.textInverted
              : theme.colors.foreground.text,
        },
        brandSubtle: {
          color: theme.colors.foreground.brand,
        },
      },
    },
  },
}))
