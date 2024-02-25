import { createAnimations } from '@tamagui/animations-react-native';
import { createInterFont } from '@tamagui/font-inter';
import { createMedia } from '@tamagui/react-native-media-driver';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createTamagui, styled, SizableText, H1, YStack, XStack } from 'tamagui';

const animations = createAnimations({
  bouncy: {
    damping: 10,
    mass: 0.9,
    stiffness: 100,
    type: 'spring',
  },
  lazy: {
    damping: 20,
    type: 'spring',
    stiffness: 60,
  },
  quick: {
    damping: 20,
    mass: 1.2,
    stiffness: 250,
    type: 'spring',
  },
});

const headingFont = createInterFont();

const bodyFont = createInterFont();

export const Container = styled(YStack, {
  flex: 1,
  padding: 24,
  backgroundColor: '$background',
});

export const Main = styled(YStack, {
  flex: 1,
  justifyContent: 'space-between',
  maxWidth: 960,
});

export const Title = styled(H1, {
  color: '$text',
  size: '$10',
  fontWeight: 'bold',
});

export const Subtitle = styled(SizableText, {
  color: '$textShade',
  size: '$9',
});

export const StyledButton = styled(XStack, {
  alignItems: 'center',
  backgroundColor: '$primary',
  borderRadius: 28,
  hoverStyle: {
    backgroundColor: '$primaryHover',
  },
  focusStyle: {
    backgroundColor: '$primaryFocus',
  },
  pressStyle: {
    backgroundColor: '$primaryPress',
  },
  justifyContent: 'center',
  maxWidth: 500,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  variants: {
    colors: {
      primary: {
        hoverStyle: {
          backgroundColor: '$primaryHover',
        },
        focusStyle: {
          backgroundColor: '$primaryFocus',
        },
        pressStyle: {
          backgroundColor: '$primaryPress',
        },
        backgroundColor: '$primary',
      },
      secondary: {
        hoverStyle: {
          backgroundColor: '$secondaryHover',
        },
        focusStyle: {
          backgroundColor: '$secondaryFocus',
        },
        pressStyle: {
          backgroundColor: '$secondaryPress',
        },
        backgroundColor: '$secondary',
      },
      accent: {
        hoverStyle: {
          backgroundColor: '$accentHover',
        },
        focusStyle: {
          backgroundColor: '$accentFocus',
        },
        pressStyle: {
          backgroundColor: '$accentPress',
        },
        backgroundColor: '$accent',
      },
    },
    roundness: {
      circular: {
        borderRadius: 28,
      },
      small: {
        borderRadius: 10,
      },
      none: {
        borderRadius: 0,
      },
    },
    hasShadow: {
      true: {
        shadowOpacity: 0.25,
      },
      false: {
        shadowOpacity: 0,
      },
    },
  },
});

export const ButtonText = styled(SizableText, {
  color: '$text',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
  flex: 1,
});

const config = createTamagui({
  defaultFont: 'body',
  defaultTheme: 'darkEcoLit',
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  themes: {
    lightEcoLit: {
      background: '#F0FFFE',
      backgroundShade: '#e4eded',
      backgroundTransparent: 'rgba(240, 255, 254, 0.59)',
      borderColor: '#cbd4d3',
      borderColorFocus: '#cbd4d3',
      borderColorHover: '#cbd4d3',
      borderColorPress: '#cbd4d3',
      primary: '#5B7E4E',
      primaryFocus: '#4d6e41',
      primaryHover: '#517345',
      primaryPress: '#446139',
      primaryTransparent: 'rgba(91, 126, 78, 0.6)',
      placeholderPrimary: '#5B7E4E',
      secondary: '#BA9E73',
      secondaryFocus: '#b0946a',
      secondaryHover: '#b59b72',
      secondaryPress: '#a88e67',
      secondaryTransparent: 'rgba(186, 158, 115, 0.6)',
      placeholderSecondary: '#BA9E73',
      accent: '#776E26',
      accentFocus: '#61591b',
      accentHover: '#6b6320',
      accentPress: '#544e18',
      accentTransparent: 'rgba(119, 110, 38, 0.6)',
      placeholderAccent: '#776E26',
      text: '#050316',
      textShade: '#1c1c21',
      placeholderColor: '#050316',
    },
    darkEcoLit: {
      background: '#101818',
      backgroundShade: '#1c2626',
      backgroundTransparent: 'rgba(16, 24, 24, 0.59)',
      borderColor: '#192121',
      borderColorFocus: '#192121',
      borderColorHover: '#192121',
      borderColorPress: '#192121',
      primary: '#5B7E4E',
      primaryFocus: '#4d6e41',
      primaryHover: '#517345',
      primaryPress: '#446139',
      primaryTransparent: 'rgba(91, 126, 78, 0.6)',
      placeholderPrimary: '#5B7E4E',
      secondary: '#BA9E73',
      secondaryFocus: '#b0946a',
      secondaryHover: '#b59b72',
      secondaryPress: '#a88e67',
      secondaryTransparent: 'rgba(186, 158, 115, 0.6)',
      placeholderSecondary: '#BA9E73',
      accent: '#776E26',
      accentFocus: '#61591b',
      accentHover: '#6b6320',
      accentPress: '#544e18',
      accentTransparent: 'rgba(119, 110, 38, 0.6)',
      placeholderAccent: '#776E26',
      text: '#EAE9FC',
      textShade: '#aeaebd',
      placeholderColor: '#EAE9FC',
    },
  },
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof config;

// Enable auto-completion of props shorthand (ex: jc="center") for Tamagui templates.
// Docs: https://tamagui.dev/docs/core/configuration

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
