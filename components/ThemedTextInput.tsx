import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    isWrong?: boolean;
};

export function ThemedTextInput({style, lightColor, darkColor, isWrong, ...rest} : ThemedTextInputProps) {
    const blurColor = useThemeColor({light: lightColor, dark: darkColor}, 'stroke');
    const focusColor = useThemeColor({light: lightColor, dark: darkColor}, 'primary');
    const dangerColor = useThemeColor({light: lightColor, dark: darkColor}, 'danger');
    const [isFocused, setFocus] = React.useState(false);
    return (
        <TextInput
            style= {[
                {borderColor: isFocused ? focusColor : blurColor}, 
                styles.default,
                style
            ]}
            {...rest}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        />
    )
}

const styles = StyleSheet.create({
    default: {
        borderWidth: 1,
        borderRadius: 10
    }
});
