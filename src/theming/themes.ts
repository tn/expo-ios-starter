import * as foundation from '@/theming/foundation'
import { palette } from '@/theming/palette'

type InteractionScale = {
  default: string
  hover: string
  active: string
  disabled: string
}

type Theme = typeof foundation & {
  colors: {
    background: {
      page: string
      subtle: string
      neutral: InteractionScale
      accentSubtle: InteractionScale
      accentSolid: InteractionScale
    }
    border: {
      neutral: {
        subtle: string
        default: string
        strong: string
        disabled: string
      }
      accent: {
        default: string
        strong: string
        focus: string
      }
    }
    foreground: {
      neutral: {
        primary: string
        secondary: string
        tertiary: string
        disabled: string
      }
      accent: {
        default: string
        strong: string
      }
      onAccent: string
    }
  }
}

const createTheme = (mode: 'light' | 'dark'): Theme => {
  const neutral = palette.colors.neutral[mode]
  const accent = palette.colors.accent[mode]

  return {
    ...foundation,
    colors: {
      background: {
        page: neutral.step1,
        subtle: neutral.step2,
        neutral: {
          default: neutral.step3,
          hover: neutral.step4,
          active: neutral.step5,
          disabled: neutral.step3,
        },
        accentSubtle: {
          default: accent.step3,
          hover: accent.step4,
          active: accent.step5,
          disabled: neutral.step3,
        },
        accentSolid: {
          default: accent.solid,
          hover: accent.solidHover,
          active: accent.step10,
          disabled: neutral.step4,
        },
      },
      border: {
        neutral: {
          subtle: neutral.step6,
          default: neutral.border,
          strong: neutral.borderStrong,
          disabled: neutral.step6,
        },
        accent: {
          default: accent.border,
          strong: accent.borderStrong,
          focus: accent.borderStrong,
        },
      },
      foreground: {
        neutral: {
          primary: neutral.step12,
          secondary: neutral.text,
          tertiary: neutral.step10,
          disabled: neutral.step10,
        },
        accent: {
          default: accent.text,
          strong: accent.textStrong,
        },
        onAccent: mode === 'light' ? neutral.step1 : neutral.step12,
      },
    },
  }
}

const light = createTheme('light')
const dark = createTheme('dark')

const themes = {
  light,
  dark,
}

export { themes }
export type { Theme }
export type Themes = typeof themes
