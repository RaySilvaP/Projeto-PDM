import { useThemeColor } from "@/hooks/useThemeColor";
import Slider, { SliderProps } from "@react-native-community/slider";

export type ThemedSliderProps = SliderProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedSlider({ lightColor, darkColor, ...rest }: ThemedSliderProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
    return (
        <Slider
            minimumTrackTintColor= {color}
            thumbTintColor= {color}
            {...rest}
        />
    )
}
