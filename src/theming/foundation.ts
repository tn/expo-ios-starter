const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 80,
} as const

const sizing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
  11: 80,
  12: 96,
} as const

const radii = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 28,
  12: 999,
} as const

const zIndices = {
  1: 100,
  2: 200,
  3: 400,
  4: 600,
  5: 800,
  6: 999,
} as const

const elevations = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 12,
  6: 16,
} as const

const fonts = {
  sans: 'system-ui',
  serif: 'ui-serif',
  rounded: 'ui-rounded',
  mono: 'ui-monospace',
} as const

const fontSizes = {
  1: 11,
  2: 12,
  3: 13,
  4: 15,
  5: 16,
  6: 17,
  7: 17,
  8: 20,
  9: 22,
  10: 28,
  11: 34,
  default: 16,
} as const

const lineHeights = {
  1: 13,
  2: 16,
  3: 18,
  4: 20,
  5: 21,
  6: 22,
  7: 22,
  8: 24,
  9: 28,
  10: 34,
  11: 41,
  default: 21,
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
  hairline: 0.5,
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
