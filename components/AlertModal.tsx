import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, ModalProps, StyleSheet, useWindowDimensions, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import { ThemedView } from "./ThemedView";
import { IconSymbol } from "./ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

export type AlertModalHandle = {
    setVisible: () => void;
}

export type AlertModalProps = ModalProps & {
    lightColor?: string;
    darkColor?: string;
    text?: string;
    type?: "fail" | "success";
}

export const AlertModal = forwardRef<AlertModalHandle, AlertModalProps>(({ lightColor, darkColor, text, type = "success", ...rest }, ref) => {
    const [isVisible, setVisibleState] = useState(false);
    const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, "primary");
    const iconBackgroudColor = useThemeColor({ light: lightColor, dark: darkColor }, "stroke");
    const viewport = useWindowDimensions();
    const width = viewport.width * .5;
    const height = viewport.width * .5;

    useImperativeHandle(ref, () => ({
        setVisible: () => setVisibleState(true),
    }));

    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={() => { setVisibleState(false) }} {...rest}>
            <View style={styles.constainer}>
                <ThemedView style={[{ width, height }, styles.modal]}>
                    <View style={[{backgroundColor: iconBackgroudColor}, styles.icon]}>
                        <IconSymbol name={type === "success" ? "checkmark" : "xmark"} color={iconColor} size={25} />
                    </View>
                    <ThemedText style={{ width: "80%", textAlign: "center" }}>{text}</ThemedText>
                    <ThemedButton onPress={() => { setVisibleState(false) }} style={{ width: "80%" }}>
                        <ThemedText lightColor="white">Fechar</ThemedText>
                    </ThemedButton>
                </ThemedView>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderRadius: 10,
    },
    icon: {
        padding: 8,
        borderRadius: 30,
    }
});
