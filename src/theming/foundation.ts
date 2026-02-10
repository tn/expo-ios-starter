import { StyleSheet } from 'react-native'

const spacing = {
  space4: 4,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space32: 32,
  space40: 40,
  space48: 48,
  space64: 64,
  space80: 80,
} as const

const sizing = {
  size4: 4,
  size8: 8,
  size12: 12,
  size16: 16,
  size20: 20,
  size24: 24,
  size32: 32,
  size40: 40,
  size44: 44,
  size48: 48,
  size64: 64,
  size80: 80,
  size96: 96,
} as const

const radii = {
  corner0: 0,
  corner4: 4,
  corner8: 8,
  corner12: 12,
  corner16: 16,
  corner20: 20,
  corner28: 28,
  full: 999,
} as const

const zIndices = {
  base: 100,
  raised: 200,
  floating: 400,
  overlay: 600,
  toast: 800,
  topmost: 999,
} as const

const elevations = {
  none: 0,
  subtle: 1,
  soft: 2,
  medium: 4,
  strong: 8,
  intense: 12,
  dramatic: 16,
} as const

const fonts = {
  sans: 'system-ui',
  serif: 'ui-serif',
  rounded: 'ui-rounded',
  mono: 'ui-monospace',
} as const

const fontSizes = {
  caption2: 11,
  caption1: 12,
  footnote: 13,
  subheadline: 15,
  callout: 16,
  body: 17,
  headline: 17,
  title3: 20,
  title2: 22,
  title1: 28,
  largeTitle: 34,
} as const

const lineHeights = {
  caption2: 13,
  caption1: 16,
  footnote: 18,
  subheadline: 20,
  callout: 21,
  body: 22,
  headline: 22,
  title3: 24,
  title2: 28,
  title1: 34,
  largeTitle: 41,
} as const

const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

const letterSpacings = {
  tight: -0.25,
  normal: 0,
  wide: 0.25,
} as const

const borderWidths = {
  hairline: StyleSheet.hairlineWidth,
  thin: 1,
  thick: 2,
} as const

const opacities = {
  hidden: 0,
  disabled: 0.4,
  overlay: 0.6,
  visible: 1,
} as const

const durations = {
  instant: 50,
  fast: 150,
  normal: 250,
  slow: 400,
} as const

export {
  borderWidths,
  durations,
  elevations,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
  opacities,
  radii,
  sizing,
  spacing,
  zIndices,
}
