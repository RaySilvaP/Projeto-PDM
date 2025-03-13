import { useThemeColor } from "@/hooks/useThemeColor";
import React, { forwardRef, useImperativeHandle } from "react";
import { StyleSheet, TextInput, TextInputProps, Text, View } from "react-native";

export type ThemedTextInputHandle = {
    showErrorMessage: (show: boolean) => void;
}

export type ThemedTextInputProps = TextInputProps & {
    lightColor?: string;
    darkColor?: string;
    errorMessage?: string;
    label?: string;
};

export const ThemedTextInput = forwardRef<ThemedTextInputHandle, ThemedTextInputProps>(({ style, lightColor, darkColor, errorMessage, label, ...rest }, ref) => {
    const blurColor = useThemeColor({ light: lightColor, dark: darkColor }, 'stroke');
    const focusColor = useThemeColor({ light: lightColor, dark: darkColor }, 'primary');
    const dangerColor = useThemeColor({ light: lightColor, dark: darkColor }, 'danger');
    const [isWrong, setWrongState] = React.useState(false);
    const [borderColor, setBorderColor] = React.useState(blurColor);

    useImperativeHandle(ref, () => ({
        showErrorMessage: (show: boolean) => setWrongState(show),
    }));

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {
                label ?
                    <Text style={[{ color: blurColor }, styles.label]}>
                        {label}
                    </Text>
                    : null
            }
            {
                isWrong ?
                    <Text style={[{ color: dangerColor }, styles.errorMessage]}>
                {errorMessage}
                </Text>
                    : null
            }
            </View>
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
        </View>
    )
});

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
    },
    errorMessage: {
        fontSize: 12,
    },
    label: {
        fontSize: 12,
    }
});
