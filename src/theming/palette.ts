import { blue, blueDark, gray, grayDark } from '@radix-ui/colors'

const colors = {
  base: {
    ...gray,
    ...blue,
    ...grayDark,
    ...blueDark,
  },
  light: {
    neutral: {
      neutral1: gray.gray1,
      neutral2: gray.gray2,
      neutral3: gray.gray3,
      neutral4: gray.gray4,
      neutral5: gray.gray5,
      neutral6: gray.gray6,
      neutral7: gray.gray7,
      neutral8: gray.gray8,
      neutral9: gray.gray9,
      neutral10: gray.gray10,
      neutral11: gray.gray11,
      neutral12: gray.gray12,
      default: gray.gray9,
    },
    accent: {
      accent1: blue.blue1,
      accent2: blue.blue2,
      accent3: blue.blue3,
      accent4: blue.blue4,
      accent5: blue.blue5,
      accent6: blue.blue6,
      accent7: blue.blue7,
      accent8: blue.blue8,
      accent9: blue.blue9,
      accent10: blue.blue10,
      accent11: blue.blue11,
      accent12: blue.blue12,
      default: blue.blue9,
    },
  },
  dark: {
    neutral: {
      neutral1: grayDark.gray1,
      neutral2: grayDark.gray2,
      neutral3: grayDark.gray3,
      neutral4: grayDark.gray4,
      neutral5: grayDark.gray5,
      neutral6: grayDark.gray6,
      neutral7: grayDark.gray7,
      neutral8: grayDark.gray8,
      neutral9: grayDark.gray9,
      neutral10: grayDark.gray10,
      neutral11: grayDark.gray11,
      neutral12: grayDark.gray12,
      default: grayDark.gray9,
    },
    accent: {
      accent1: blueDark.blue1,
      accent2: blueDark.blue2,
      accent3: blueDark.blue3,
      accent4: blueDark.blue4,
      accent5: blueDark.blue5,
      accent6: blueDark.blue6,
      accent7: blueDark.blue7,
      accent8: blueDark.blue8,
      accent9: blueDark.blue9,
      accent10: blueDark.blue10,
      accent11: blueDark.blue11,
      accent12: blueDark.blue12,
      default: blueDark.blue9,
    },
  },
}

export const palette = {
  colors,
}

export type Palette = typeof palette
