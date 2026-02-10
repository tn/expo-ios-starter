import { blue, blueDark, gray, grayDark } from '@radix-ui/colors'

type ScaleStep = `step${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`

type RadixScale = Record<ScaleStep, string> & {
  solid: string
  solidFocused: string
  border: string
  borderStrong: string
  text: string
  textStrong: string
}

const createRadixScale = (
  source: Record<string, string>,
  prefix: string,
): RadixScale => {
  const steps = Array.from({ length: 12 }, (_, index) => {
    const step = (index + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    const key = `step${step}` as const

    return [key, source[`${prefix}${step}`]]
  })

  const scale = Object.fromEntries(steps) as Record<ScaleStep, string>

  return {
    ...scale,
    solid: scale.step9,
    solidFocused: scale.step10,
    border: scale.step7,
    borderStrong: scale.step8,
    text: scale.step11,
    textStrong: scale.step12,
  }
}

const createTonePair = (
  lightSource: Record<string, string>,
  darkSource: Record<string, string>,
  prefix: string,
) => ({
  light: createRadixScale(lightSource, prefix),
  dark: createRadixScale(darkSource, prefix),
})

const colors = {
  neutral: createTonePair(gray, grayDark, 'gray'),
  accent: createTonePair(blue, blueDark, 'blue'),
}

export const palette = {
  colors,
}

export type Palette = typeof palette
