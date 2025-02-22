import { useThemeColor } from "@/hooks/useThemeColor";
import { Pressable, PressableProps, StyleSheet } from "react-native";

export type ThemedButtonProps = PressableProps & {
    lightColor?: string,
    darkColor?: string,
    type?: 'success' | 'danger' | 'transparent'
}

export function ThemedButton({ lightColor, darkColor, type, ...rest }: ThemedButtonProps) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, type === undefined ? "primary" : type);
    return (
        <Pressable
            style = {[
                {backgroundColor: color},
                styles.button
            ]}
            {...rest}
        >

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
    height: 40,
    borderWidth: 1,
    borderColor: 'transparent'
  }
});
