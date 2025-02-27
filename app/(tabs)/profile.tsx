import { AlertModal, AlertModalHandle } from '@/components/AlertModal';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSlider } from '@/components/ThemedSlider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput, ThemedTextInputHandle } from '@/components/ThemedTextInput';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Profile() {
    const [text, onChangeText] = React.useState('useless text');
    const themedTextInput = useRef<ThemedTextInputHandle>(null);
    const successModal = useRef<AlertModalHandle>(null);
    return (
        <View style={styles.container}>
            <ThemedButton onPress={() => { successModal.current?.setVisible() }}>
                <ThemedText lightColor= "white">
                    Open Modal
                </ThemedText>
            </ThemedButton>
            <ThemedSlider
                minimumValue={0}
                maximumValue={1}
                style={{ width: '50%' }}
            />
            <ThemedTextInput
                ref={themedTextInput}
                onChangeText={onChangeText}
                value={text}
                placeholder="text"
                errorMessage="Test"
            />
            <AlertModal type="fail" ref={successModal} text= "Não foi possível criar sua conta!">
            </AlertModal>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
