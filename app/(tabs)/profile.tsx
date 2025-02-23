import { ThemedButton } from '@/components/ThemedButton';
import { ThemedSlider } from '@/components/ThemedSlider';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    const [text, onChangeText] = React.useState('useless text');

    return (
        <View style={styles.container}>
            <ThemedButton onPress={() => {Alert.alert("Test")}} shape = "circle"> 
                <Text style={{color: 'white'}}>Test</Text>
            </ThemedButton>
            <ThemedSlider
                minimumValue = {0}
                maximumValue = {1}
                style = {{width: '50%'}}
            />
            <ThemedTextInput
                onChangeText = {onChangeText}
                value= {text}
                placeholder= "text"/>
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
