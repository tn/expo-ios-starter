import * as foundation from '@/theming/foundation'
import { palette } from '@/theming/palette'

export type Theme = typeof foundation & {
  colors: {
    background: {
      page: string
      surface: string
      surfaceSecondary: string

      brand: string
      brandSubtle: string
    }
    foreground: {
      text: string
      textSecondary: string
      textInverted: string
      brand: string
      brandSubtle: string
    }
  }
}

const light: Theme = {
  ...foundation,
  colors: {
    background: {
      page: palette.colors.light.neutral.neutral1,
      surface: palette.colors.light.neutral.neutral3,
      surfaceSecondary: palette.colors.light.neutral.neutral5,

      brand: palette.colors.light.accent.accent9,
      brandSubtle: palette.colors.light.accent.accent3,
    },
    foreground: {
      text: palette.colors.light.neutral.neutral12,
      textSecondary: palette.colors.light.neutral.neutral11,
      textInverted: palette.colors.light.neutral.neutral1,
      brand: palette.colors.light.accent.accent9,
      brandSubtle: palette.colors.light.accent.accent3,
    },
  },
}

const dark: Theme = {
  ...foundation,
  colors: {
    background: {
      page: palette.colors.dark.neutral.neutral1,
      surface: palette.colors.dark.neutral.neutral3,
      surfaceSecondary: palette.colors.dark.neutral.neutral5,

      brand: palette.colors.dark.accent.accent9,
      brandSubtle: palette.colors.dark.accent.accent3,
    },
    foreground: {
      text: palette.colors.dark.neutral.neutral12,
      textSecondary: palette.colors.dark.neutral.neutral11,
      textInverted: palette.colors.dark.neutral.neutral1,
      brand: palette.colors.dark.accent.accent9,
      brandSubtle: palette.colors.dark.accent.accent3,
    },
  },
}

export const themes = {
  light,
  dark,
}

export type Themes = typeof themes
