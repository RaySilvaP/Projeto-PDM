import { useThemeColor } from "@/hooks/useThemeColor";
import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, TextInput, TextInputProps, Text, View } from "react-native";

export type ThemedTextInputHandle = {
    setWrong: () => void;
}

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    errorMessage?: string;
};

export const ThemedTextInput = forwardRef<ThemedTextInputHandle, ThemedTextInputProps>(({ style, lightColor, darkColor, errorMessage, ...rest }, ref) => {
    const blurColor = useThemeColor({ light: lightColor, dark: darkColor }, 'stroke');
    const focusColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
    const dangerColor = useThemeColor({ light: lightColor, dark: darkColor }, 'danger');
    const [isWrong, setWrongState] = React.useState(false);
    const [borderColor, setBorderColor] = React.useState(blurColor);
    useImperativeHandle(ref, () => ({
        setWrong: () => setWrongState(true),
    }));
    return (
        <View>
            <TextInput
                style={[
                    { borderColor },
                    styles.textInput,
                    style
                ]}
                {...rest}
                onFocus={() => {
                    setBorderColor(focusColor);
                    setWrongState(false);
                }
                }
                onBlur={() => setBorderColor(blurColor)}
            />
            {
                isWrong ?
                    <Text style={[{ color: dangerColor }, styles.errorMessage]}>
                        {errorMessage}
                    </Text>
                    : null}
        </View>
    )
});

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 10
    },
    errorMessage: {
        fontSize: 12,
    }
});
