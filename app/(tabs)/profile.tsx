import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSlider } from '@/components/ThemedSlider';
import { ThemedTextInput, ThemedTextInputHandle, ThemedTextInputProps } from '@/components/ThemedTextInput';
import React, { useRef } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    const [text, onChangeText] = React.useState('useless text');
    const themedTextInput = useRef<ThemedTextInputHandle>(null);
    return (
        <View style={styles.container}>
            <ThemedButton onPress={() => {themedTextInput.current?.setWrong(false)}} shape = "circle"> 
                <Text style={{color: 'white'}}>Test</Text>
            </ThemedButton>
            <ThemedSlider
                minimumValue = {0}
                maximumValue = {1}
                style = {{width: '50%'}}
            />
            <ThemedTextInput
                ref={themedTextInput}
                onChangeText = {onChangeText}
                value= {text}
                placeholder= "text"
                errorMessage= "Test"
            />
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
