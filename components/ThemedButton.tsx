import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export type ThemedButtonProps = PressableProps & {
    lightColor?: string;
    darkColor?: string;
    type?: 'success' | 'danger' | 'transparent';
    shape?: 'circle';
    style?: ViewStyle | ViewStyle[];
}

export function ThemedButton({ style, lightColor, darkColor, type, shape, ...rest }: ThemedButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, type === undefined ? "primary" : type);
    return (
        <Pressable
            style = {[
                {backgroundColor: color},
                styles.default,
                shape === 'circle' ? styles.circle : undefined,
                style
            ]}
            {...rest}
        >

        </Pressable>
    )
}

const styles = StyleSheet.create({
    default: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  circle: {
      width: 40,
      height: 40,
      borderRadius: 20
  }
});
