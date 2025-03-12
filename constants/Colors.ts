/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#775CE5'; 
const tintColorDark = '#FFFFFF';

export const Colors = {
  light: {
    text: '#1E1E1E', 
    background: '#FFFFFF', 
    tint: tintColorLight, 
    icon: '#A0A0A0', 
    tabIconDefault: '#A0A0A0',
    tabIconSelected: tintColorLight,
    primary: '#775CE5',
    title: '#1E1E1E', 
    success: '#4CAF50',
    danger: '#FF4D4F',
    transparent: '#00000000',
    stroke: '#E5E4E3', 
    placeholder: '#C4C4C4', 
    backgroundCard: '#F8F8F8', 
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#775CE5',
    title: '#ECEDEE',
    success: '#4CAF50',
    danger: '#FF4D4F',
    transparent: '#00000000',
    stroke: '#E5E4E3',
    placeholder: '#6D6D6D',
    backgroundCard: '#222426',
  },
};
