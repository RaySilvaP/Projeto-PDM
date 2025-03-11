/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    textPrimary: '#111A41',
    textSecondary: '#8E9093',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#7140FD',
    success: '#5BCF95',
    danger: '#FF4D4F',
    transparent: '#00000000',
    stroke: '#E5E4E3'
  },
  dark: {
    textPrimary: '#111A41',
    textSecondary: '#8E9093',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#7140FD',
    success: '#5BCF95',
    danger: '#FF4D4F',
    transparent: '#00000000',
    stroke: '#E5E4E3'
  },
};
